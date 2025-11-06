import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Career = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-[180px] pb-16">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Karijera
              </h1>
              <p className="text-xl text-muted-foreground">
                Podstranica Karijera je Vaš vodič kroz svijet profesionalnog
                razvoja. Upoznajte Ured za razvoj karijera Sveučilišta u
                Zagrebu, koji usmjerava studente prema uspješnoj karijeri kroz
                razna savjetovanja i radionice.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-8">
              <p className="text-xl text-muted-foreground">
                Prvi korak prema uspješnoj karijeri je izrada kvalitetnog
                životopisa. Iskoristite CV-Graditelj koji Vam nudimo kako biste
                istaknuli svoje vještine i iskustva na najbolji mogući način.
              </p>
              <Link to={"/cv-builder"}>
                <div className="flex flex-col items-center gap-4 bg-gradient-card p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-border hover:text-blue-600">
                  <img
                    src={"/cv-builder-logo.png"}
                    className="w-[500px] h-[300px]"
                    alt="logo cv builder"
                  />
                  <h3 className="font-semibold text-lg mb-2">
                    IZRADI VLASTITI CV
                  </h3>
                </div>
              </Link>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Ured za razvoj karijera
              </h1>
              <p className="text-2xl">Vizija</p>
              <p className="text-xl text-muted-foreground">
                Jedan je od ureda Rektorata s fokusom na tržište rada studenata,
                sastavnica, udruga i javnih uprava. Promiče praktična znanja,
                suradnju, interakciju i volonterski rad studenata, dobra je
                priprema za buduće karijere, odnose između studenata,
                poduzetnika, alumnâ, sastavnica i sveučilišta s ciljem
                potencijalnoga zaposlenja. Ured surađuje i s ostalim hrvatskim
                javnim sveučilištima čiji uredi za razvoj karijera promiču iste
                vrijednosti prema vlastitim sastavnicama.
              </p>
              <p className="text-2xl">Misija</p>
              <p className="text-xl text-muted-foreground">
                Postati jedan od ključnih ureda za razvoj studentskih karijera
                na razini Republike Hrvatske koji informira, educira te spaja
                studente i poslodavce. Poticati studentsku kompetitivnost na
                tržištu rada tijekom studiranja i nakon završetka fakulteta te
                izravno i neizravno djelovati na opću atmosferu zadovoljstva
                mladih poslovnim životom u Hrvatskoj. Kako bi se ostvarila
                navedena misija, ključna je stavka Ureda davati potpunu potporu
                uredima i projektima za razvoj karijera na sveučilišnim
                sastavnicama.
              </p>
              <p className="text-2xl">Sastavnice</p>
              <p className="text-xl text-muted-foreground">
                Sastavnice, odnosno njihovi karijerni uredi, naši su ključni
                partneri koji djeluju lokalno prema studentima fakulteta i
                akademija, a krovni ured Sveučilišta povezuje sastavnice, pruža
                im potporu i dodatnu komunikaciju s udrugama i javnim ustanovama
                te u zajedničkom radu podiže kvalitetu i zadovoljstvo ne samo
                studenata nego i zaposlenika pojedinoga ureda za razvoj karijera
                i karijernih savjetnika na sastavnicama.
              </p>
              <p className="text-2xl">S kim surađujemo?</p>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-xl text-muted-foreground">studentima</li>
                <li className="text-xl text-muted-foreground">
                  poduzetnicima / poslodavcima
                </li>
                <li className="text-xl text-muted-foreground">alumnima</li>
                <li className="text-xl text-muted-foreground">
                  djelatnicima karijernih ureda/centara sastavnica /
                  koordinatorima tematike na sastavnicama
                </li>
                <li className="text-xl text-muted-foreground">
                  ostalim uredima Sveučilišta u Zagrebu
                </li>
                <li className="text-xl text-muted-foreground">
                  studentskim neprofitnim organizacijama
                </li>
                <li className="text-xl text-muted-foreground">
                  građanskim udrugama
                </li>
                <li className="text-xl text-muted-foreground">
                  ostalim hrvatskim sveučilištima
                </li>
                <li className="text-xl text-muted-foreground">
                  tijelima državne uprave
                </li>
                <li className="text-xl text-muted-foreground">
                  međunarodnim neprofitnim organizacijama
                </li>
              </ul>
              <p className="text-2xl">Aktivnosti Ureda</p>
              <p className="text-xl text-muted-foreground">
                Kako Ured raste, tako se i naše aktivnosti šire, ovisno o novim
                kontaktima, projektima i suradnicima koji pristupaju i koji su
                voljni raditi s nama na projektima s ciljem zapošljavanja
                studenata i razvoja studentskih karijera. Otvoreni smo za sve
                oblike suradnje prema studentskim udrugama, studentima, uredima
                sastavnica, građanskim udrugama, hrvatskim i međunarodnim
                institucijama, stoga pozivamo sve zainteresirane za suradnju da
                nam se slobodno obrate na e-adresu: karijere@unizg.hr.
              </p>
              <p className="text-2xl">Neke od naših aktivnosti:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-xl text-muted-foreground">
                  mentorstva prema studentskim udrugama – razvoj poslovnih
                  planova projekata, potpora projektima iz područja promocije i
                  planiranja
                </li>
                <li className="text-xl text-muted-foreground">
                  potpora uredima za razvoj karijera i karijernim savjetnicima
                  na sastavnica
                </li>
                <li className="text-xl text-muted-foreground">
                  organizacija panela i okruglih stolova karijernih savjetnika
                  sastavnica
                </li>
                <li className="text-xl text-muted-foreground">Dan karijera</li>
                <li className="text-xl text-muted-foreground">
                  Tjedan karijera
                </li>
                <li className="text-xl text-muted-foreground">
                  radionice na daljinu
                </li>
                <li className="text-xl text-muted-foreground">
                  individualna i grupna savjetovanja za studente
                </li>
                <li className="text-xl text-muted-foreground">
                  digitalizacija procesa između studenata i potencijalnih
                  poslodavaca
                </li>
                <li className="text-xl text-muted-foreground">
                  razvoj odnosa s tvrtkama, potencijalnim poslodavcima
                </li>
                <li className="text-xl text-muted-foreground">
                  razvoj projekata s bivšim studentima Sveučilišta u Zagrebu
                </li>
                <li className="text-xl text-muted-foreground">
                  suradnja s građanskim udrugama na projektima potpore mladima u
                  dijelu zapošljavanja
                </li>
                <li className="text-xl text-muted-foreground">
                  razvoj projekata s gradskim i državnim upravama
                </li>
              </ul>
              <p className="text-2xl">
                Rukovoditelj Središnjeg ureda za razvoj karijera
              </p>
              <p className="text-xl text-muted-foreground">
                Marko Ljutić, dipl, ing.
              </p>
              <p className="text-xl text-muted-foreground"></p>telefon: +385 1
              4698 130
              <p className="text-xl text-muted-foreground"></p>faks: +385 1 469
              81 41
              <p className="text-xl text-muted-foreground"></p>e-adresa:
              marko.ljutic@unizg.hr
              <p className="text-2xl">Viši stručni savjetnik</p>
              <p className="text-xl text-muted-foreground">
                Maks Vinšćak, mag. psihologije
              </p>
              <p className="text-2xl">Stručna suradnica</p>
              <p className="text-xl text-muted-foreground">
                Jelena Ivančić, mag. kiparstva
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Career;
