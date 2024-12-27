import { Profile } from "@/widgets/profile/ui/Profile";
import { Example } from "@/widgets/example/ui/Example";
import { ThemeSwitch } from "@/widgets/theme/ui/ThemeSwitch";
import { getTheme } from "@/features/theme/api/theme";

export default async function Home() {
  // await new Promise((res) => setTimeout(() => res(undefined), 5000));

  const userTheme = await getTheme();

  return (
    <div>
      <Profile />
      <Example />
      <ThemeSwitch currentTheme={userTheme} />
    </div>
  );
}
