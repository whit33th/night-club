// Lightweight stubs to bypass Zod validation while keeping admin.ts imports intact
// Each schema exposes a safeParse that always succeeds.

type ParseResult<T> =
  | { success: true; data: T }
  | { success: false; error: any };

function ok<T>(data: T): ParseResult<T> {
  return { success: true, data } as const;
}

export const zEvent = { safeParse: ok };
export const zEventPatch = { safeParse: ok };
export const zNews = { safeParse: ok };
export const zNewsPatch = { safeParse: ok };
export const zClubInfo = { safeParse: ok };
export const zClubInfoPatch = { safeParse: ok };
export const zResident = { safeParse: ok };
export const zResidentPatch = { safeParse: ok };
export const zFaq = { safeParse: ok };
export const zFaqPatch = { safeParse: ok };

export function toConvexIssues(_error: any): any[] {
  return [];
}
