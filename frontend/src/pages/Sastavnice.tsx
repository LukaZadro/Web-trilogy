import Navbar from "@/components/Navbar";
import React, { useMemo, useState } from "react";

type College = {
    name: string;
    addresses: string[];
    website?: string;
    phone?: string;
    fax?: string;
    emails?: string[];
    dean?: string;
};

const akademije: College[] = [
    {
        name: "Akademija dramske umjetnosti",
        addresses: ["Trg Republike Hrvatske 5", "10000 Zagreb"],
        website: "http://www.adu.hr",
        phone: "+385 1 482 85 06",
        fax: "+385 1 482 85 08",
        emails: ["dekanat@adu.hr"],
        dean: "prof. art. Davor Švaić",
    },
    {
        name: "Akademija likovnih umjetnosti",
        addresses: ["Ilica 85", "Ulica Rudolfa Kolaka 12", "10000 Zagreb"],
        website: "http://www.alu.hr",
        phone: "+385 1 377 73 00",
        fax: "+385 1 377 34 01",
        emails: ["alu@alu.hr"],
        dean: "prof. art. Alen Novoselec",
    },
    {
        name: "Muzička akademija",
        addresses: ["Trg Republike Hrvatske 12", "10000 Zagreb"],
        website: "http://www.muza.hr",
        phone: "+385 1 482 01 00",
        fax: "+385 1 487 23 80",
        emails: ["muza@muza.hr"],
        dean: "prof. art. Srđan Filip Čaldarović",
    },
];

const fakulteti: College[] = [
    {
        name: "Agronomski fakultet",
        addresses: ["Svetošimunska 25", "10000 Zagreb"],
        website: "http://www.agr.hr",
        phone: "+385 1 239 37 77",
        fax: "+385 1 231 53 00",
        emails: ["dekanat@agr.hr"],
        dean: "prof. dr. sc. Aleksandar Mešić",
    },
    {
        name: "Arhitektonski fakultet",
        addresses: ["Fra Andrije Kačića Miošića 26", "10000 Zagreb"],
        website: "http://www.arhitekt.hr",
        phone: "+385 1 463 92 22",
        fax: "+385 1 463 98 10",
        emails: ["dekan@arhitekt.hr"],
        dean: "prof. art. Siniša Justić",
    },
    {
        name: "Edukacijsko-rehabilitacijski fakultet",
        addresses: [
            "Znanstveno-učilišni kampus",
            "Borongajska cesta 83f",
            "10000 Zagreb",
        ],
        website: "http://www.erf.hr",
        phone: "+385 1 245 75 00",
        fax: "+385 1 245 75 59",
        emails: ["dekan@erf.hr"],
        dean: "izv. prof. dr. sc. Ante Bilić Prcić",
    },
    {
        name: "Ekonomski fakultet",
        addresses: ["Kennedyjev trg 6", "10000 Zagreb"],
        website: "http://www.efzg.hr",
        phone: "+385 1 238 33 33",
        fax: "+385 1 230 84 72",
        emails: ["dean@efzg.hr"],
    },
    {
        name: "Fakultet elektrotehnike i računarstva",
        addresses: ["Unska 3", "10000 Zagreb"],
        website: "http://www.fer.hr",
        phone: "+385 1 612 99 99",
        fax: "+385 1 617 00 07",
        emails: ["dekanat@fer.hr"],
        dean: "prof. dr. sc. Vedran Bilas",
    },
    {
        name: "Fakultet filozofije i religijskih znanosti",
        addresses: ["Jordanovac 110, pp 169", "10000 Zagreb"],
        website: "http://www.ffrz.hr",
        phone: "+385 1 23 54 222",
        fax: "+385 1 23 54 201",
        emails: ["dekan@ffrz.unizg.hr"],
        dean: "izv. prof. dr. sc. Antun Volenik",
    },
    {
        name: "Fakultet hrvatskih studija",
        addresses: [
            "Znanstveno-učilišni kampus",
            "Borongajska cesta 83d",
            "10000 Zagreb",
        ],
        website: "http://www.hrstud.hr",
        phone: "+385 1 2457 600",
        fax: "+385 1 2457 636",
        emails: ["dekanov.ured@hrstud.hr"],
    },
    {
        name: "Fakultet kemijskog inženjerstva i tehnologije",
        addresses: ["Marulićev trg 19", "10000 Zagreb"],
        website: "http://www.fkit.hr",
        phone: "+385 1 459 72 81",
        fax: "+385 1 459 72 60",
        emails: ["office@fkit.hr"],
        dean: "prof. dr. sc. Ante Jukić",
    },
    {
        name: "Fakultet organizacije i informatike",
        addresses: ["Pavlinska 2", "42000 Varaždin"],
        website: "http://www.foi.hr",
        phone: "+385 42 390 800",
        fax: "+385 42 213 413",
        emails: ["ured-dekana@foi.hr"],
    },
    {
        name: "Fakultet političkih znanosti",
        addresses: ["Lepušićeva 6", "10000 Zagreb"],
        website: "http://www.fpzg.hr",
        phone: "+385 1 464 20 00",
        fax: "+385 1 465 53 16",
        emails: ["dekanat@fpzg.hr", "dario.nikic-cakar@remove-this.fpzg.hr"],
        dean: "izv. prof. dr. sc. Dario Nikić Čakar",
    },
    {
        name: "Fakultet prometnih znanosti",
        addresses: ["Vukelićeva 4", "10000 Zagreb"],
        website: "https://www.fpz.unizg.hr/hr/naslovna/novosti",
        phone: "+385 1 238 02 22",
        fax: "+385 1 231 44 15",
        emails: ["dekan@fpz.hr"],
        dean: "izv. prof. dr. sc. Marko Šoštarić",
    },
    {
        name: "Fakultet strojarstva i brodogradnje",
        addresses: ["Ivana Lučića 5", "10000 Zagreb"],
        website: "http://www.fsb.hr",
        phone: "+385 1 616 82 22",
        fax: "+385 1 615 69 40",
        emails: ["fsb@fsb.hr"],
        dean: "prof. dr. sc. Zdenko Tonković",
    },
    {
        name: "Fakultet šumarstva i drvne tehnologije",
        addresses: ["Svetošimunska 25", "10000 Zagreb"],
        website: "http://www.sumfak.hr",
        phone: "+385 1 235 25 55",
        fax: "+385 1 231 86 16",
        emails: ["jmargaletic@sumfak.unizg.hr"],
        dean: "prof. dr. sc. Josip Margaletić",
    },
    {
        name: "Farmaceutsko-biokemijski fakultet",
        addresses: ["Ante Kovačića 1", "10000 Zagreb"],
        website: "http://www.pharma.hr",
        phone: "+385 1 481 82 88",
        fax: "+385 1 639 44 00",
        emails: ["dekanat@pharma.hr"],
    },
    {
        name: "Filozofski fakultet",
        addresses: ["Ivana Lučića 3", "10000 Zagreb"],
        website: "http://www.ffzg.hr",
        phone: "+385 1 40 92 017",
        emails: ["dekan@ffzg.hr"],
        dean: "izv. prof. dr. sc Domagoj Tončinić",
    },
    {
        name: "Geodetski fakultet",
        addresses: ["Kačićeva 26", "Savska cesta 144a", "10000 Zagreb"],
        website: "http://www.geof.hr",
        phone: "+385 1 463 92 22",
        fax: "+385 1 482 80 81",
        emails: ["dekan@geof.hr"],
        dean: "prof. dr. sc. Mladen Zrinjski",
    },
    {
        name: "Geotehnički fakultet",
        addresses: ["Hallerova aleja 7", "42000 Varaždin"],
        website: "http://www.gfv.hr",
        phone: "+385 42 408 900",
        fax: "+385 42 313 587",
        emails: ["ured.dekana@gfv.hr"],
    },
    {
        name: "Građevinski fakultet",
        addresses: ["Fra Andrije Kačića Miošića 26", "10000 Zagreb"],
        website: "http://www.grad.hr",
        phone: "+385 1 463 92 22",
        dean: "prof. dr. sc. Domagoj Damjanović",
    },
    {
        name: "Grafički fakultet",
        addresses: ["Getaldićeva 2", "10000 Zagreb"],
        website: "http://www.grf.hr",
        phone: "+385 1 237 10 80",
        fax: "+385 1 237 10 77",
        emails: ["dekan@grf.hr"],
        dean: "prof. dr. sc. Klaudio Pap",
    },
    {
        name: "Katolički bogoslovni fakultet",
        addresses: ["Vlaška 38", "10000 Zagreb"],
        website: "http://www.kbf.hr",
        phone: "+385 1 489 04 00",
        fax: "+385 1 481 47 04",
        emails: ["ured@kbf.hr"],
        dean: "prof. dr. sc. Mario Cifrak",
    },
    {
        name: "Kineziološki fakultet",
        addresses: ["Horvaćanski zavoj 15", "10000 Zagreb"],
        website: "http://www.kif.hr",
        phone: "+385 1 365 86 66",
        fax: "+385 1 363 41 46",
        emails: ["dekanat@kif.hr"],
        dean: "izv. prof. dr. sc. Tomislav Rupčić",
    },
    {
        name: "Medicinski fakultet",
        addresses: ["Šalata 3b", "10000 Zagreb"],
        website: "http://www.mef.hr",
        phone: "+385 1 456 67 77",
        fax: "+385 1 456 67 24",
        emails: ["mf@mef.hr"],
        dean: "prof. dr. sc. Slavko Orešković",
    },
    {
        name: "Metalurški fakultet",
        addresses: ["Aleja narodnih heroja 3", "44000 Sisak"],
        website: "http://www.simet.hr",
        phone: "+385 44 533 380",
        fax: "+385 44 533 378",
        emails: ["dekanat@simet.hr", "iivanic@remove-this.simet.hr"],
    },
    {
        name: "Pravni fakultet",
        addresses: ["Trg Republike Hrvatske 14", "10000 Zagreb"],
        website: "http://www.pravo.hr",
        phone: "+385 1 456 43 27",
        fax: "+385 1 456 40 30",
        emails: ["dekanat@pravo.hr"],
        dean: "prof. dr. sc. Ivan Koprić",
    },
    {
        name: "Prehrambeno-biotehnološki fakultet",
        addresses: ["Pierottijeva 6", "10000 Zagreb"],
        website: "http://www.pbf.hr",
        phone: "+385 1 460 50 00",
        fax: "+385 1 483 60 83",
        emails: ["dekan@pbf.hr", "verica.dragovic-uzelac@remove-this.pbf.hr"],
    },
    {
        name: "Prirodoslovno-matematički fakultet",
        addresses: ["Horvatovac 102a", "Maksimirska cesta 132", "10000 Zagreb"],
        website: "http://www.pmf.hr",
        phone: "+385 1 460 60 00",
        fax: "+385 1 460 60 13",
        emails: ["dekanat@dekanat.pmf.hr"],
        dean: "prof. dr. sc. Ivančica Ternjej",
    },
    {
        name: "Rudarsko-geološko-naftni fakultet",
        addresses: ["Pierottijeva 6", "10000 Zagreb"],
        website: "http://www.rgn.hr",
        phone: "+385 1 553 57 00",
        fax: "+385 1 483 60 53",
        emails: ["dekanat@rgn.hr"],
        dean: "izv. prof. dr. sc. Vladislav Brkić",
    },
    {
        name: "Stomatološki fakultet",
        addresses: ["Gundulićeva 5", "10000 Zagreb"],
        website: "http://www.sfzg.hr",
        phone: "+385 1 480 21 11",
        fax: "+385 1 483 08 04",
        emails: ["dekanat@sfzg.hr", "vodanovic@remove-this.sfzg.hr"],
        dean: "prof. dr. sc. Marin Vodanović",
    },
    {
        name: "Tekstilno-tehnološki fakultet",
        addresses: ["Prilaz baruna Filipovića 28a", "10000 Zagreb"],
        website: "http://www.ttf.hr",
        phone: "+385 1 371 25 00",
        fax: "+385 1 371 25 99",
        emails: ["fakultet@ttf.hr"],
    },
    {
        name: "Učiteljski fakultet",
        addresses: ["Savska cesta 77", "10000 Zagreb"],
        website: "http://www.ufzg.hr",
        phone: "+385 1 632 73 00",
        fax: "+385 1 617 78 60",
        emails: [
            "dekanat@ufzg.hr",
            "blazenka-filipan-zignic@remove-this.ufzg.hr",
        ],
    },
    {
        name: "Veterinarski fakultet",
        addresses: ["Heinzelova 55", "10000 Zagreb"],
        website: "http://www.vef.hr",
        phone: "+385 1 239 01 11",
        fax: "+385 1 244 13 90",
        emails: ["dekan@vef.hr"],
        dean: "prof. dr. sc. Marko Samardžija",
    },
];

// glavna lista koristi se u ostatku komponente; ako želite zasebno prikazivanje,
// koristite 'fakulteti' i 'akademije' direktno pri renderiranju
const data: College[] = [...fakulteti, ...akademije];

const highlight = (text: string, q: string) => {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
        <>
            {text.slice(0, idx)}
            <mark>{text.slice(idx, idx + q.length)}</mark>
            {text.slice(idx + q.length)}
        </>
    );
};

const Sastavnice: React.FC = () => {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return data;
        return data.filter((c) => {
            if (c.name.toLowerCase().includes(q)) return true;
            if (c.dean?.toLowerCase().includes(q)) return true;
            if (c.website?.toLowerCase().includes(q)) return true;
            if (c.phone?.toLowerCase().includes(q)) return true;
            if (c.fax?.toLowerCase().includes(q)) return true;
            if (c.emails?.some((e) => e.toLowerCase().includes(q))) return true;
            if (c.addresses?.some((a) => a.toLowerCase().includes(q)))
                return true;
            return false;
        });
    }, [query]);

    return (
        <div className="min-h-screen bg-background">
          <div className="pt-20">
            <Navbar />
          </div>
            
            <div className="p-5 pt-20 max-w-2xl mx-auto font-sans">
                <h1 className="mb-2 text-2xl">Sastavnice</h1>

                <div className="mb-4">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Pretraži po imenu, adresi, dekanu, emailu, webu ili telefonu..."
                        className="w-full p-3 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid gap-3">
                    {filtered.length === 0 ? (
                        <div className="text-gray-500">Nema rezultata.</div>
                    ) : (
                        filtered.map((c, i) => (
                            <article
                                key={i}
                                className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
                            >
                                <h2 className="m-0 mb-1 text-xl">
                                    {highlight(c.name, query)}
                                </h2>

                                <div className="text-sm text-gray-800 mb-2">
                                    {c.addresses.map((a, idx) => (
                                        <div key={idx}>
                                            {highlight(a, query)}
                                        </div>
                                    ))}
                                </div>

                                <div className="text-xs text-gray-600 flex gap-3 flex-wrap">
                                    {c.website && (
                                        <div>
                                            Web:{" "}
                                            <a
                                                href={c.website}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {highlight(c.website, query)}
                                            </a>
                                        </div>
                                    )}
                                    {c.phone && (
                                        <div>
                                            Tel: {highlight(c.phone, query)}
                                        </div>
                                    )}
                                    {c.fax && (
                                        <div>
                                            Fax: {highlight(c.fax, query)}
                                        </div>
                                    )}
                                    {c.emails && c.emails.length > 0 && (
                                        <div>
                                            E-mail:{" "}
                                            {c.emails.map((e, idx) => (
                                                <span key={idx}>
                                                    {highlight(e, query)}
                                                    {idx < c.emails.length - 1
                                                        ? ", "
                                                        : ""}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {c.dean && (
                                        <div>
                                            Dekan: {highlight(c.dean, query)}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sastavnice;
