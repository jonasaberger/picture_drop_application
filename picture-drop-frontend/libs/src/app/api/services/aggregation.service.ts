import {Submission} from '../models/submission';
import {SubmissionItem} from '../models/submission-item';
import {Workspace} from '../models/workspace';


export function aggregateStats(workspaces: Workspace[],submissions: Submission[], submissionItems: SubmissionItem[]): void {
  // 2a. SubmissionId → WorkspaceId
  const submissionToWorkspace = new Map<number, number>();
  submissions.forEach(s => submissionToWorkspace.set(s.Id, s.WorkspaceId));

  // 2b. WorkspaceId → Statistik
  const workspaceStats = new Map<number, { pictures: number; videos: number }>();

  submissionItems.forEach(item => {
    const workspaceId = submissionToWorkspace.get(item.SubmissionId);
    if (!workspaceId) return;

    if (!workspaceStats.has(workspaceId)) {
      workspaceStats.set(workspaceId, { pictures: 0, videos: 0 });
    }

    const stats = workspaceStats.get(workspaceId)!;
    if (item.ContentType.startsWith("image/")) {
      stats.pictures++;
    } else if (item.ContentType.startsWith("video/")) {
      stats.videos++;
    }
  });

  // 2c. Workspace-Objekte anreichern
  workspaces.forEach(ws => {
    const stats = workspaceStats.get(ws.Id) ?? { pictures: 0, videos: 0 };
    ws.isActive = ws.SubscriptionStatus === "Active";
    ws.pictures = stats.pictures;
    ws.videos = stats.videos;
  });
}
