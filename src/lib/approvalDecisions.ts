export type ApprovalDecision = "CP" | "WF" | "approved" | "return";

const decisions = new Map<number, ApprovalDecision>();

export function setDecision(itemIdx: number, decision: ApprovalDecision): void {
  decisions.set(itemIdx, decision);
}

export function getDecision(itemIdx: number): ApprovalDecision | undefined {
  return decisions.get(itemIdx);
}

export function getAllDecisions(): Map<number, ApprovalDecision> {
  return new Map(decisions);
}

export function clearDecisions(): void {
  decisions.clear();
}
