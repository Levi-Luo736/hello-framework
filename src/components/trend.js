import {html} from "npm:htl";

export function Trend(
  value,
  {
    locale = "zh-CN",
    format,
    positive = "green",
    negative = "red",
    base = "muted",
    positiveSuffix = " ↗︎",
    negativeSuffix = " ↘︎",
    baseSuffix = ""
  } = {}
) {
  const variant = value > 0 ? negative : value < 0 ? positive : base;
  const text = value.toLocaleString(locale, {signDisplay: "always", ...format});
  const suffix = value > 0 ? positiveSuffix : value < 0 ? negativeSuffix : baseSuffix;
  return html`<span class="small ${variant}">${text}${suffix}`;
}