import { useState } from "react";
import Card from "../components/Card";
import SliderInput from "../components/SliderInput";
import Stat from "../components/Stat";

export default function CompoundTool({ t }) {
  const [principal, setPrincipal] = useState(200);
  const [monthly,   setMonthly]   = useState(10);
  const [rate,      setRate]      = useState(7);
  const [years,     setYears]     = useState(20);

  const mr         = rate / 100 / 12;
  const months     = years * 12;
  const fv         = principal * Math.pow(1 + mr, months) + monthly * ((Math.pow(1 + mr, months) - 1) / mr);
  const totalInput = principal + monthly * months;
  const gain       = fv - totalInput;

  const bars = Array.from({ length: years }, (_, i) => {
    const m = (i + 1) * 12;
    const v = principal * Math.pow(1 + mr, m) + monthly * ((Math.pow(1 + mr, m) - 1) / mr);
    return { year: i + 1, fv: v, input: principal + monthly * m };
  });
  const maxFV = bars[bars.length - 1]?.fv || 1;

  return (
    <div>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Stat label="最終資産" value={`${Math.round(fv).toLocaleString()}万`}         color="#10b981" t={t} />
          <Stat label="総投入額" value={`${Math.round(totalInput).toLocaleString()}万`}  color={t.sub}   t={t} />
          <Stat label="運用益"   value={`+${Math.round(gain).toLocaleString()}万`}       color="#10b981" t={t} />
        </div>
      </Card>
      <Card t={t} style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 80 }}>
          {bars.filter((_, i) => i % Math.ceil(years / 20) === 0 || i === years - 1).map((b, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
              <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: 70 }}>
                <div style={{ width: "100%", background: "#10b981", opacity: 0.3, borderRadius: "2px 2px 0 0", height: `${(b.input / maxFV) * 100}%` }} />
                <div style={{ width: "100%", background: "#10b981", borderRadius: "2px 2px 0 0", height: `${((b.fv - b.input) / maxFV) * 100}%`, marginTop: -2 }} />
              </div>
              <div style={{ fontSize: "0.5rem", color: t.muted }}>{b.year}y</div>
            </div>
          ))}
        </div>
      </Card>
      <Card t={t}>
        <SliderInput label="初期投資"     value={principal} min={0}  max={5000} step={50}  unit="万円" onChange={setPrincipal} color="#10b981" t={t} />
        <SliderInput label="月々の積立"   value={monthly}   min={0}  max={100}  step={1}   unit="万円" onChange={setMonthly}   color="#10b981" t={t} />
        <SliderInput label="年利（想定）" value={rate}       min={1}  max={15}   step={0.5} unit="%"   onChange={setRate}       color="#10b981" t={t} />
        <SliderInput label="運用期間"     value={years}      min={1}  max={40}   step={1}   unit="年"  onChange={setYears}      color="#10b981" t={t} />
      </Card>
    </div>
  );
}
