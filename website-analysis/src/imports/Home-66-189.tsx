import svgPaths from "./svg-2n5pj4qi5n";
import imgMax from "figma:asset/9e94b57949fc4b425b02d2f0c43b5b61caa05408.png";
import imgLuna from "figma:asset/6edb21adb41dabbf3440024eb7841d26f07f69b5.png";
import imgCharlie from "figma:asset/cb90ebf16137faeea64bc40efec09be57fbc3288.png";
import imgBella from "figma:asset/3eedf5cc5cc4e630ad81b7e6d9a4704d8445ce76.png";
import imgRocky from "figma:asset/b4a55c973480bac20512ec670e241fa901418ae9.png";
import imgWhiskers from "figma:asset/ff150c611d9a0a44691c841559000454d9e73a33.png";

function Heading() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative self-stretch" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1447e6] text-[29.9px] w-full">
        <p className="leading-[36px] whitespace-pre-wrap">{`JLT Cat Lovers' Group - Outstanding Vet Bills`}</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="Container">
      <Heading />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white shrink-0 sticky top-0 w-full z-[2]" data-name="Header">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-px px-[224px] relative w-full">
          <Container />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[28.2px] text-center whitespace-nowrap">
        <p className="leading-[36px]">JLT Cats</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[29.25px] not-italic relative shrink-0 text-[#314158] text-[16.7px] text-center whitespace-nowrap">
        <p className="mb-0">We are a dedicated rescue group based in JLT, working tirelessly to provide medical care and shelter for</p>
        <p className="mb-0">abandoned cats and dogs. Every donation goes directly to veterinary treatment, helping us save more lives in</p>
        <p>{`our community. `}</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[11.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16.5px] text-center whitespace-nowrap">
        <p className="leading-[28px]">$2,450 raised of $4,000 goal</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45556c] text-[16.9px] text-center whitespace-nowrap">
        <p className="leading-[28px]">6 active campaigns • 61%</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-center flex flex-wrap items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#e2e8f0] h-[16px] relative rounded-[33554400px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#155dfc] h-[16px] left-0 right-[39%] rounded-[33554400px] top-0" data-name="Background" />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Background1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[320px] max-w-[896px] right-[320px] top-[64px]" data-name="Container">
      <Container3 />
      <Container5 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[22.3px] w-full">
        <p className="leading-[32px] whitespace-pre-wrap">Browse veterinary fundraisers</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#45556c] text-[15px] w-full">
        <p className="leading-[24px] whitespace-pre-wrap">Help animals in need get the medical care they deserve</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[32px] right-[32px] top-[339.75px]" data-name="Container">
      <Heading2 />
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bottom-[16.5px] content-stretch flex flex-col items-start left-[41px] overflow-clip pb-[2px] pr-[271.58px] pt-px top-[16.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#717182] text-[13px] whitespace-nowrap">
        <p className="leading-[normal]">Search by pet name, type, or condition...</p>
      </div>
    </div>
  );
}

function Container13() {
  return <div className="absolute bottom-[16.5px] left-[41px] top-[16.5px] w-[522px]" data-name="Container" />;
}

function Input() {
  return (
    <div className="bg-[#f1f5f9] h-[50px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container12 />
        <Container13 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Component() {
  return (
    <div className="-translate-y-1/2 absolute left-[12px] size-[20px] top-1/2" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component 1">
          <path d={svgPaths.pcddfd00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 17.5L13.9167 13.9167" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[32px] max-w-[576px] right-[928px] top-[435.75px]" data-name="Container">
      <Input />
      <Component />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[56px] overflow-clip pb-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[17px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">Max: Emergency surgery</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#e2e8f0] h-[8px] relative rounded-[33554400px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#155dfc] h-[8px] left-0 right-1/2 rounded-[33554400px] top-0" data-name="Background" />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16.7px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">$750 raised of $1500 goal</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-0 p-[20px] right-0 top-[256px]" data-name="Container">
      <Heading3 />
      <Background2 />
      <Container16 />
    </div>
  );
}

function Max() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Max">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[276.95%] left-0 max-w-none top-[-88.47%] w-full" src={imgMax} />
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-[#f1f5f9] content-stretch flex flex-col h-[256px] items-start justify-center left-0 top-0 w-[472.66px]" data-name="Background">
      <Max />
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#dbeafe] left-[20px] rounded-[8px] top-[calc(50%+23.25px)]" data-name="Background+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#193cb8] text-[11.8px] text-center whitespace-nowrap">
          <p className="leading-[16px]">partially funded</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[414px] left-0 overflow-clip right-[997.34px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0" data-name="Background+Border+Shadow">
      <Container15 />
      <Background3 />
      <BackgroundBorder />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[56px] overflow-clip pb-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16.9px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">Luna: Dental cleaning and extractions</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#e2e8f0] h-[8px] relative rounded-[33554400px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#155dfc] h-[8px] left-0 right-[44%] rounded-[33554400px] top-0" data-name="Background" />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16.5px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">$450 raised of $800 goal</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-0 p-[20px] right-0 top-[256px]" data-name="Container">
      <Heading4 />
      <Background4 />
      <Container18 />
    </div>
  );
}

function Luna() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Luna">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[194.04%] left-0 max-w-none top-[-47.02%] w-full" src={imgLuna} />
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="absolute bg-[#f1f5f9] content-stretch flex flex-col h-[256px] items-start justify-center left-0 right-0 top-0" data-name="Background">
      <Luna />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#dbeafe] left-[19.34px] rounded-[8px] top-[calc(50%+23.25px)]" data-name="Background+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#193cb8] text-[11.8px] text-center whitespace-nowrap">
          <p className="leading-[16px]">partially funded</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[414px] left-[498.66px] overflow-clip right-[498.67px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0" data-name="Background+Border+Shadow">
      <Container17 />
      <Background5 />
      <BackgroundBorder1 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[56px] overflow-clip pb-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16.7px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">Charlie: X-rays and wound treatment</p>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#e2e8f0] h-[8px] relative rounded-[33554400px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#155dfc] h-[8px] left-0 right-[54%] rounded-[33554400px] top-0" data-name="Background" />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16.9px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">$275 raised of $600 goal</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-0 p-[20px] right-0 top-[256px]" data-name="Container">
      <Heading5 />
      <Background6 />
      <Container20 />
    </div>
  );
}

function Charlie() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Charlie">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[288.4%] left-0 max-w-none top-[-94.2%] w-full" src={imgCharlie} />
      </div>
    </div>
  );
}

function Background7() {
  return (
    <div className="absolute bg-[#f1f5f9] content-stretch flex flex-col h-[256px] items-start justify-center left-0 top-0 w-[472.66px]" data-name="Background">
      <Charlie />
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#dbeafe] left-[19.67px] rounded-[8px] top-[calc(50%+23.25px)]" data-name="Background+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#193cb8] text-[11.8px] text-center whitespace-nowrap">
          <p className="leading-[16px]">partially funded</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function BackgroundBorderShadow2() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[414px] left-[997.33px] overflow-clip right-[0.01px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-0" data-name="Background+Border+Shadow">
      <Container19 />
      <Background7 />
      <BackgroundBorder2 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[56px] overflow-clip pb-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16.9px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">Bella: Blood work and medication</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16.7px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">$525 raised of $525 goal</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-0 p-[20px] top-[256px] w-[472.66px]" data-name="Container">
      <Heading6 />
      <div className="bg-[#155dfc] h-[8px] rounded-[33554400px] shrink-0 w-full" data-name="Background" />
      <Container22 />
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#dcfce7] left-[22px] rounded-[8px] top-[calc(50%+98.25px)]" data-name="Background+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#016630] text-[11.6px] text-center whitespace-nowrap">
          <p className="leading-[16px]">funded</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Bella() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-full" data-name="Bella">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[230.79%] left-0 max-w-none top-[-65.4%] w-full" src={imgBella} />
      </div>
      <BackgroundBorder3 />
    </div>
  );
}

function Background8() {
  return (
    <div className="absolute bg-[#f1f5f9] content-stretch flex flex-col h-[256px] items-start justify-center left-0 right-0 top-0" data-name="Background">
      <Bella />
    </div>
  );
}

function BackgroundBorderShadow3() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[414px] left-0 overflow-clip right-[997.34px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[438px]" data-name="Background+Border+Shadow">
      <Container21 />
      <Background8 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[56px] overflow-clip pb-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[17px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">Rocky: Spay/neuter surgery</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16.6px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">$350 raised of $350 goal</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-0 p-[20px] right-0 top-[256px]" data-name="Container">
      <Heading7 />
      <div className="bg-[#155dfc] h-[8px] rounded-[33554400px] shrink-0 w-full" data-name="Background" />
      <Container24 />
    </div>
  );
}

function Rocky() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Rocky">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[276.96%] left-0 max-w-none top-[-88.48%] w-full" src={imgRocky} />
      </div>
    </div>
  );
}

function Background9() {
  return (
    <div className="absolute bg-[#f1f5f9] content-stretch flex flex-col h-[256px] items-start justify-center left-0 right-0 top-0" data-name="Background">
      <Rocky />
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#f1f5f9] left-[20.34px] rounded-[8px] top-[calc(50%+26.25px)]" data-name="Background+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1d293d] text-[12px] text-center whitespace-nowrap">
          <p className="leading-[16px]">closed</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function BackgroundBorderShadow4() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[414px] left-[498.66px] overflow-clip right-[498.67px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[438px]" data-name="Background+Border+Shadow">
      <Container23 />
      <Background9 />
      <BackgroundBorder4 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start min-h-[56px] overflow-clip pb-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16.7px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">Whiskers: Eye infection treatment</p>
      </div>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#e2e8f0] h-[8px] relative rounded-[33554400px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#155dfc] h-[8px] left-0 right-[67%] rounded-[33554400px] top-0" data-name="Background" />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16.9px] w-full">
        <p className="leading-[28px] whitespace-pre-wrap">$100 raised of $300 goal</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-0 p-[20px] right-0 top-[256px]" data-name="Container">
      <Heading8 />
      <Background10 />
      <Container26 />
    </div>
  );
}

function Whiskers() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Whiskers">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[278.49%] left-0 max-w-none top-[-89.24%] w-full" src={imgWhiskers} />
      </div>
    </div>
  );
}

function Background11() {
  return (
    <div className="absolute bg-[#f1f5f9] content-stretch flex flex-col h-[256px] items-start justify-center left-0 right-0 top-0" data-name="Background">
      <Whiskers />
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#dbeafe] left-[19.67px] rounded-[8px] top-[calc(50%+23.25px)]" data-name="Background+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#193cb8] text-[11.8px] text-center whitespace-nowrap">
          <p className="leading-[16px]">partially funded</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function BackgroundBorderShadow5() {
  return (
    <div className="absolute bg-white border border-[#e2e8f0] border-solid h-[414px] left-[997.33px] overflow-clip right-[0.01px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[438px]" data-name="Background+Border+Shadow">
      <Container25 />
      <Background11 />
      <BackgroundBorder5 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[852px] left-[32px] right-[32px] top-[517.75px]" data-name="Container">
      <BackgroundBorderShadow />
      <BackgroundBorderShadow1 />
      <BackgroundBorderShadow2 />
      <BackgroundBorderShadow3 />
      <BackgroundBorderShadow4 />
      <BackgroundBorderShadow5 />
    </div>
  );
}

function Main() {
  return (
    <div className="h-[1401.75px] max-w-[1536px] relative shrink-0 w-[1536px] z-[1]" data-name="Main">
      <Container2 />
      <Container9 />
      <Container11 />
      <Container14 />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#eff6ff] isolate items-center left-0 min-h-[1200px] pb-[32px] right-0 to-white top-0" data-name="Background">
      <Header />
      <Main />
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white relative size-full" data-name="Home">
      <Background />
    </div>
  );
}