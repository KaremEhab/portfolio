import IphonePage from "@/components/iphone";
import MacbookScreen from "@/components/macbook";

export default function SkillsPage() {
  return (
    <section id="skills" className="min-h-screen py-20 scroll-mt-20">
      <h1 className="text-3xl font-bold">Skills</h1>
      {/* <div
        style={{
          width: "100%",
          maxWidth: 400,
        }}
      >
        <IphonePage
          imageSrc={
            "https://images.ctfassets.net/kx1vyfs6nvow/5WL8AR2CIJE8p1WptuR9cM/d0a5be8f88c1d40fe9be171f827d507f/GAHEZHA.png"
          }
        />
      </div> */}
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          maxHeight: 800,
        }}
      >
        <MacbookScreen imageSrc="https://images.ctfassets.net/kx1vyfs6nvow/1pLwHVdbOAdVg3drznYoFT/a5a77ceb81b9764051921a307d6ad407/Kareem_Portfolio.png" />
      </div>
    </section>
  );
}
