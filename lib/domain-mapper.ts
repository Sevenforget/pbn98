import fs from "fs";
import path from "path";

// 도메인 매핑 데이터 타입
interface DomainMapping {
  origin: string;
  domain: string;
}

// 캐시된 도메인 매핑 데이터
let cachedDomainMappings: DomainMapping[] | null = null;

/**
 * pbn-domains.json 파일을 읽어서 도메인 매핑 데이터를 가져오는 함수
 */
function loadDomainMappings(): DomainMapping[] {
  if (cachedDomainMappings) {
    return cachedDomainMappings;
  }

  try {
    // 프로젝트 루트에서 pbn-domains.json 파일 경로 찾기
    let jsonPath = path.join(process.cwd(), "pbn-domains.json");

    // 현재 디렉토리에 없으면 상위 디렉토리들을 확인
    let currentDir = process.cwd();
    while (
      !fs.existsSync(jsonPath) &&
      currentDir !== path.dirname(currentDir)
    ) {
      currentDir = path.dirname(currentDir);
      jsonPath = path.join(currentDir, "pbn-domains.json");
    }

    if (!fs.existsSync(jsonPath)) {
      console.warn("pbn-domains.json 파일을 찾을 수 없습니다.");
      return [];
    }

    const jsonContent = fs.readFileSync(jsonPath, "utf-8");
    const domainMappings = JSON.parse(jsonContent) as DomainMapping[];

    // 유효성 검증
    if (!Array.isArray(domainMappings)) {
      throw new Error("도메인 매핑 데이터가 배열 형태가 아닙니다.");
    }

    cachedDomainMappings = domainMappings;
    return domainMappings;
  } catch (error) {
    console.error("도메인 매핑 데이터 로드 중 오류:", error);
    return [];
  }
}

/**
 * 프로젝트 이름(origin)으로 도메인을 조회하는 함수
 * @param origin 프로젝트 이름 (예: "pbn1", "pbn2")
 * @returns 해당 도메인 문자열 또는 null
 */
export function getDomainByOrigin(origin: string): string | null {
  const domainMappings = loadDomainMappings();
  const mapping = domainMappings.find((item) => item.origin === origin);
  return mapping ? mapping.domain : null;
}

/**
 * 현재 프로젝트의 도메인을 자동으로 감지하는 함수
 * 현재 작업 디렉토리의 이름을 기반으로 프로젝트를 판단
 * @returns 현재 프로젝트의 도메인 또는 기본값
 */
export function getCurrentProjectDomain(): string {
  try {
    // 현재 작업 디렉토리에서 프로젝트 이름 추출
    const currentPath = process.cwd();
    const pathSegments = currentPath.split(path.sep);

    // 마지막 디렉토리명이 pbnX 형태인지 확인
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment && /^pbn\d+$/.test(lastSegment)) {
      const domain = getDomainByOrigin(lastSegment);
      if (domain) {
        return domain;
      }
    }

    // package.json에서 프로젝트 정보 확인 시도
    const packageJsonPath = path.join(currentPath, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      if (packageJson.name && /^pbn\d+/.test(packageJson.name)) {
        const projectName = packageJson.name.match(/^pbn\d+/)?.[0];
        if (projectName) {
          const domain = getDomainByOrigin(projectName);
          if (domain) {
            return domain;
          }
        }
      }
    }

    console.warn(
      "현재 프로젝트의 도메인을 감지할 수 없어 기본값을 사용합니다."
    );
    return "https://example.com"; // 기본값
  } catch (error) {
    console.error("현재 프로젝트 도메인 감지 중 오류:", error);
    return "https://example.com"; // 기본값
  }
}

/**
 * 프로젝트 이름으로 도메인을 조회하되, 없으면 기본값을 반환
 * @param origin 프로젝트 이름
 * @param defaultDomain 기본 도메인 (선택사항)
 * @returns 도메인 문자열
 */
export function getDomainWithFallback(
  origin: string,
  defaultDomain = "https://example.com"
): string {
  const domain = getDomainByOrigin(origin);
  return domain || defaultDomain;
}

/**
 * 모든 도메인 매핑 정보를 반환하는 함수 (디버깅용)
 * @returns 전체 도메인 매핑 배열
 */
export function getAllDomainMappings(): DomainMapping[] {
  return loadDomainMappings();
}

/**
 * 캐시를 초기화하는 함수 (테스트용)
 */
export function clearDomainMappingCache(): void {
  cachedDomainMappings = null;
}
