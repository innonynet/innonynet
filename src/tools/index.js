import FireTool      from "./FireTool";
import AssetTool     from "./AssetTool";
import CompoundTool  from "./CompoundTool";
import SalaryTool    from "./SalaryTool";
import CloudTool     from "./CloudTool";
import CertScorer    from "./CertScorer";
import PomodoroTool  from "./PomodoroTool";
import MeetingTool   from "./MeetingTool";
import BokiTool      from "./BokiTool";
import JobChangeTool from "./JobChangeTool";
import MbtiTool      from "./MbtiTool";

export const TOOLS = [
  { id: "fire",     label: "FIRE Calculator",  ja: "FIREシミュレーター",  tag: "投資",       color: "#f97316", desc: "積立・利回りから財務的自由までの年数を計算",       component: FireTool      },
  { id: "asset",    label: "Asset Allocator",  ja: "資産分散チェッカー",  tag: "投資",       color: "#3b82f6", desc: "ポートフォリオの分散度を可視化してスコア化",         component: AssetTool     },
  { id: "compound", label: "Compound Calc",    ja: "複利計算機",          tag: "投資",       color: "#10b981", desc: "元本・利率・期間から将来の資産額をシミュレート",     component: CompoundTool  },
  { id: "salary",   label: "Salary → Hourly", ja: "年収・時給換算",      tag: "エンジニア", color: "#8b5cf6", desc: "残業・有給を考慮した実質時給を算出",                 component: SalaryTool    },
  { id: "cloud",    label: "Cloud Cost",       ja: "クラウドコスト比較",  tag: "エンジニア", color: "#06b6d4", desc: "AWS / GCP / Azureの月額コストを概算比較",          component: CloudTool     },
  { id: "cert",     label: "Cert Scorer",      ja: "技術資格スコアラー",  tag: "エンジニア", color: "#f59e0b", desc: "保有資格からエンジニアの市場価値スコアを算出",       component: CertScorer    },
  { id: "pomodoro", label: "Pomodoro",         ja: "ポモドーロタイマー",  tag: "生産性",     color: "#ef4444", desc: "25分集中・5分休憩で作業効率アップ",                 component: PomodoroTool  },
  { id: "meeting",  label: "Meeting Cost",     ja: "会議コスト計算機",    tag: "生産性",     color: "#f59e0b", desc: "参加人数と時給から会議の費用を可視化",               component: MeetingTool   },
  { id: "boki",     label: "Boki Practice",    ja: "簿記練習ツール",      tag: "生産性",     color: "#7c3aed", desc: "簿記3級レベルの仕訳問題をランダム出題",             component: BokiTool      },
  { id: "job",      label: "Job Change Score", ja: "転職タイミング診断",  tag: "生産性",     color: "#ec4899", desc: "今転職すべきか？5つの指標でスコア化",               component: JobChangeTool },
  { id: "mbti",     label: "MBTI Diagnosis",   ja: "MBTI性格診断",        tag: "生産性",     color: "#8b5cf6", desc: "16問の質問で16タイプの性格タイプを判定",            component: MbtiTool      },
];

export const TAGS       = ["投資", "エンジニア", "生産性"];
export const TAG_COLORS = { 投資: "#f97316", エンジニア: "#3b82f6", 生産性: "#10b981" };
