import type { Chart as ChartJS } from 'chart.js';

const getOrCreateTooltip = (chart: ChartJS) => {
  let tooltipEl = chart.canvas.parentNode?.querySelector('div');
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'absolute shadow-lg rounded-lg bg-white opacity-1 pointer-events-none';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';
    const table = document.createElement('table');
    table.style.margin = '0px';
    tooltipEl.appendChild(table);
    chart.canvas.parentNode?.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const tooltipHandler =
  (callbackRenderTooltip: (_: string) => HTMLElement) =>
  (context: {
    tooltip: {
      caretX: number;
      caretY: number;
      options: {
        bodyFont: { string: string };
        padding: number;
      };
      labelColors: Array<{
        backgroundColor: string;
        borderColor: string;
      }>;
      opacity: number;
      title: string[];
      body: Array<{ lines: string }>;
    };
    chart: ChartJS;
  }) => {
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = '0';
      return;
    }

    if (tooltip.body) {
      const titleLines = tooltip.title || ([] as string[]);
      const tableHead = document.createElement('thead');
      titleLines.forEach((title: string) => {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(title));

        const tr = document.createElement('tr');
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement('tbody');
      const bodyLines = tooltip.body.map((b) => b.lines);
      bodyLines.forEach((body: string, i: number) => {
        const colors = tooltip.labelColors[i];
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.style.background = colors.backgroundColor;
        span.style.marginRight = '10px';
        span.style.height = '14px';
        span.style.width = '14px';

        const td = document.createElement('td');
        td.style.borderWidth = '0';
        td.appendChild(span);

        const spanText = document.createElement('span');
        spanText.appendChild(callbackRenderTooltip(body));
        td.appendChild(spanText);

        const tr = document.createElement('tr');
        tr.style.backgroundColor = 'inherit';
        tr.style.borderWidth = '0';
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector('table');
      tableRoot?.classList.add('bg-white');

      while (tableRoot?.firstChild) {
        tableRoot?.firstChild.remove();
      }

      tableRoot?.appendChild(tableHead);
      tableRoot?.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
    tooltipEl.style.opacity = '1';
    tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
    tooltipEl.style.top = `${positionY + tooltip.caretY}px`;
    tooltipEl.style.font = tooltip.options.bodyFont.string;
  };
