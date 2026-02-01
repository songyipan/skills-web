import { Badge,Button } from "@workspace/ui/components";
import { useTranslation } from "@workspace/ui/hooks";
export const ShowBoard = () => {
  const { t, lang } = useTranslation();
  return (
    <section className="relative rounded-[2rem] lg:rounded-[3rem] border border-border bg-card/40 p-8 lg:p-16 overflow-hidden shadow-xl group">
      <div className="relative z-10 max-w-4xl space-y-6 lg:space-y-8">
        <div className="flex gap-2">
          <Badge variant="indigo" className="px-4 py-1">
            {t("hero.badge")}
          </Badge>
          <Badge variant="zinc" className="px-4 py-1">
            {t("hero.badgeStable")}
          </Badge>
        </div>
        <h1
          className={`font-black tracking-tighter leading-[1.05] text-foreground ${lang === "zh" ? "text-4xl lg:text-6xl" : "text-5xl lg:text-7xl"}`}
        >
          {t("hero.title1")} <br />
          <span className="text-primary text-glow inline-block mt-1 lg:mt-2">
            {t("hero.title2")}
          </span>
        </h1>
        <p className="text-muted-foreground text-base lg:text-xl leading-relaxed font-medium max-w-xl">
          {t("hero.desc")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-4">
          <Button
            size="lg"
            className="px-12 rounded-xl h-14 lg:h-16 font-black text-lg w-full sm:w-auto"
          >
            {t("hero.btnStart")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-10 rounded-xl h-14 lg:h-16 text-lg font-black w-full sm:w-auto bg-card/50"
          >
            {t("hero.btnDocs")}
          </Button>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-[400px] lg:w-[700px] h-[400px] lg:h-[700px] bg-primary/10 blur-[100px] lg:blur-[180px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/15 transition-all duration-1000" />
    </section>
  );
};
