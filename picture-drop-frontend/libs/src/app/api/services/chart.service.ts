import { Workspace } from "../models/workspace";
import { SubmissionItem } from "../models/submission-item";
import { Submission } from "../models/submission";
import Chart from 'chart.js/auto';
import { getRandomColor } from "./random.color.service";

export class ChartService {
  static createChart(
    canvas: HTMLCanvasElement,
    submissionItems: SubmissionItem[],
    workspaces: Workspace[],
    allSubmissions: Submission[],
    selectedWorkspace?: string,
    filteredWorkspaces?: Workspace[]
  ): Chart {
    const monthlyData = this.getMonthlyUploadData(submissionItems, allSubmissions);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const activeMonths = monthlyData.totalUploads
      .map((count, index) => ({ count, index }))
      .filter(month => month.count > 0)
      .map(month => monthNames[month.index]);

    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels: activeMonths,
        datasets: selectedWorkspace ?
          [{
            label: selectedWorkspace,
            data: monthlyData.totalUploads.filter(count => count > 0),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }] :
          (filteredWorkspaces || workspaces)
            .filter(ws => {
              const workspaceData = monthlyData.byWorkspace[ws.Id] || [];
              return workspaceData.some(count => count > 0);
            })
            .map(ws => {
              const workspaceData = monthlyData.byWorkspace[ws.Id] || Array(12).fill(0);
              return {
                label: ws.Name,
                data: workspaceData.filter((count, index) => monthlyData.totalUploads[index] > 0),
                backgroundColor: getRandomColor(ws.Id),
                borderColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 1
              };
            })
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: Math.max(...monthlyData.totalUploads) * 1.2,
            title: {
              display: true,
              text: 'Number of Uploads'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        }
      }
    });
  }

  private static getMonthlyUploadData(
    submissionItems: SubmissionItem[],
    allSubmissions: Submission[]
  ): { totalUploads: number[], byWorkspace: { [key: number]: number[] } } {
    const totalUploads = Array(12).fill(0);
    const byWorkspace: { [key: number]: number[] } = {};

    submissionItems.forEach(item => {
      const date = new Date(item.CreatedOn);
      const month = date.getMonth();
      const submission = allSubmissions.find(sub => sub.Id === item.SubmissionId);
      const workspaceId = submission?.WorkspaceId;

      totalUploads[month]++;

      if (workspaceId) {
        if (!byWorkspace[workspaceId]) {
          byWorkspace[workspaceId] = Array(12).fill(0);
        }
        byWorkspace[workspaceId][month]++;
      }
    });

    return { totalUploads, byWorkspace };
  }
}
