import { Button } from "@workspace/ui/components";
import { Layers } from "lucide-react";
import { useTranslation } from "@workspace/ui/hooks";
export const SkillsEmpty = ({
  handleGuideClick,
}: {
  handleGuideClick: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="  flex flex-col items-center ">
      <div className="w-20 h-20 lg:w-32 lg:h-32 rounded-[2rem] lg:rounded-[3rem] bg-card border border-border flex items-center justify-center mb-8 lg:mb-12 text-muted-foreground shadow-inner">
        <Layers className="w-10 h-10 lg:w-16 lg:h-16" />
      </div>
      <h3 className="text-2xl font-black text-muted-foreground mb-4 lg:mb-6">
        {t("library.emptyTitle")}
      </h3>
      <p className="text-muted-foreground/60  mb-6  text-lg  max-w-xl font-medium leading-relaxed">
        {t("library.emptyDesc")}
      </p>

      <Button
        onClick={() => {
          handleGuideClick();
        }}
        className="rounded-xl "
      >
        {t("library.emptyBtn")}
      </Button>
    </div>
  );
};
