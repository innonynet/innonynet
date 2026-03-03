import { useState } from "react";
import Card from "../components/Card";
import SliderInput from "../components/SliderInput";
import Stat from "../components/Stat";

export default function SalaryTool({ t }) {
  const [annual,   setAnnual]   = useState(550);
  const [overtime, setOvertime] = useState(20);
  const [vacation, setVacation] = useState(10);

  const workDays      = 365 - 104 - 15 - vacation;
  const workHours     = workDays * 8 + overtime * 12;
  const hourly        = Math.round((annual * 10000) / workHours);
  const nominalHourly = Math.round((annual * 10000) / (workDays * 8));
  const taxApprox     = annual > 600 ? annual * 0.3 : annual * 0.25;
  const netHourly     = Math.round(((annual - taxApprox) * 10000) / workHours);

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Stat label="額面時給"   value={`¥${nominalHourly.toLocaleString()}`} color={t.sub}    t={t} />
          <Stat label="実質時給"   value={`¥${hourly.toLocaleString()}`}        color="#8b5cf6" t={t} />
          <Stat label="手取り時給" value={`¥${netHourly.toLocaleString()}`}     color="#8b5cf6" t={t} />
        </div>
      </Card>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ fontSize: "0.72rem", color: t.muted, marginBottom: "0.6rem" }}>月給換算</div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.6rem", color: t.muted }}>額面</div>
            <div style={{ fontFamily: "monospace", fontWeight: 700, color: t.text }}>{Math.round(annual / 12 * 10) / 10}万円</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6rem", color: t.muted }}>手取り（概算）</div>
            <div style={{ fontFamily: "monospace", fontWeight: 700, color: "#8b5cf6" }}>{Math.round((annual - taxApprox) / 12 * 10) / 10}万円</div>
          </div>
          <div>
            <div style={{ fontSize: "0.6rem", color: t.muted }}>年間稼働時間</div>
            <div style={{ fontFamily: "monospace", fontWeight: 700, color: t.text }}>{workHours.toLocaleString()}h</div>
          </div>
        </div>
      </Card>
      <Card t={t}>
        <SliderInput label="年収"             value={annual}   min={200} max={2000} step={10} unit="万円" onChange={setAnnual}   color="#8b5cf6" t={t} />
        <SliderInput label="月平均残業時間"   value={overtime} min={0}   max={80}   step={5}  unit="h"   onChange={setOvertime} color="#8b5cf6" t={t} />
        <SliderInput label="年間有給取得日数" value={vacation} min={0}   max={20}   step={1}  unit="日"  onChange={setVacation} color="#8b5cf6" t={t} />
      </Card>
    </div>
  );
}
