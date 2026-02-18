import svgPaths from "./svg-x676go9bme";
import imgMax from "figma:asset/6d071c39be4e1af2f4ea0f667d4b0fd8842dcbc2.png";

function Component() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Component 1">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center whitespace-nowrap">
          <p className="leading-[20px]">Back</p>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[11px] py-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Component />
      <Container1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[30px] w-full">
        <p className="leading-[36px] whitespace-pre-wrap">{`JLT Cat Lovers' Group`}</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#45556c] text-[14px] w-full">
        <p className="leading-[20px] whitespace-pre-wrap">Pet Details</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Container">
      <Heading />
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative w-full">
        <Button />
        <Container2 />
      </div>
    </div>
  );
}

function BackgroundHorizontalBorderShadow() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Background+HorizontalBorder+Shadow">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[25px] pt-[24px] px-[208px] relative w-full">
          <Container />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[56px]" data-name="Heading 4">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#0a0a0a] text-[30px] top-[18px] whitespace-nowrap">
        <p className="leading-[36px]">Max</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[28px] left-0 top-[44px] w-[56px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#717182] text-[17.6px] top-[14px] whitespace-nowrap">
        <p className="leading-[28px]">Dog</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[72px] left-0 top-0 w-[56px]" data-name="Container">
      <Heading1 />
      <Container9 />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="absolute bg-[#dbeafe] border border-[rgba(0,0,0,0.1)] border-solid h-[22px] left-[842px] overflow-clip rounded-[8px] top-0 w-[100px]" data-name="Background+Border">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-[49px] not-italic text-[#193cb8] text-[11.8px] text-center top-[10px] whitespace-nowrap">
        <p className="leading-[16px]">partially funded</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[72px] left-0 top-0 w-[942px]" data-name="Container">
      <Container8 />
      <BackgroundBorder1 />
    </div>
  );
}

function Margin() {
  return (
    <div className="absolute h-[88px] left-[24px] top-[24px] w-[942px]" data-name="Margin">
      <Container7 />
    </div>
  );
}

function Max1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[384px] left-1/2 top-1/2 w-[480px]" data-name="Max">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-25%] w-full" src={imgMax} />
      </div>
    </div>
  );
}

function Max() {
  return (
    <div className="absolute h-[384px] left-0 overflow-clip top-0 w-[942px]" data-name="Max">
      <Max1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute h-[384px] left-0 overflow-clip rounded-[10px] top-0 w-[942px]" data-name="Container">
      <Max />
    </div>
  );
}

function Margin1() {
  return (
    <div className="absolute h-[400px] left-[24px] top-[118px] w-[942px]" data-name="Margin">
      <Container10 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[518px] relative shrink-0 w-[990px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Margin />
        <Margin1 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container6 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[15.6px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Medical Condition</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-[990px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] pt-[24px] px-[24px] relative w-full">
        <Heading2 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#314158] text-[16px] w-full">
        <p className="leading-[26px] whitespace-pre-wrap">Emergency surgery</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-[990px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] px-[24px] relative w-full">
        <Container13 />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start p-px relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">{`Pet's Story`}</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0 w-[990px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] pt-[24px] px-[24px] relative w-full">
        <Heading3 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#314158] text-[16px] w-full">
        <p className="leading-[26px] whitespace-pre-wrap">Max is a 5-year-old golden retriever who was found abandoned with a severe injury. He needs emergency surgery to save his life.</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-[990px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] px-[24px] relative w-full">
        <Container16 />
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start p-px relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container14 />
      <Container15 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Recent Donations</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#717182] text-[16px] w-full">
        <p className="leading-[24px] whitespace-pre-wrap">2 generous donors</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-[990px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6px] items-start pt-[24px] px-[24px] relative w-full">
        <Heading4 />
        <Container18 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Sarah Johnson</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#45556c] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">January 21, 2025</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[115.7300033569336px] relative shrink-0" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#008236] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">$250.00</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[10px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative w-full">
          <Container21 />
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172b] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Anonymous</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#45556c] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">January 20, 2025</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#008236] text-[20px] whitespace-nowrap">
        <p className="leading-[28px]">$500.00</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[10px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative w-full">
          <Container25 />
          <Container28 />
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Background1 />
      <Background2 />
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-[990px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] px-[24px] relative w-full">
        <Container20 />
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start p-px relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container17 />
      <Container19 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-full items-start relative shrink-0 w-[992px]" data-name="Container">
      <BackgroundBorder />
      <BackgroundBorder2 />
      <BackgroundBorder3 />
      <BackgroundBorder4 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[24px] w-[430px]" data-name="Heading 4">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#0a0a0a] text-[16px] top-[8px] whitespace-nowrap">
        <p className="leading-[16px]">Funding Progress</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute h-[46px] left-px top-px w-[478px]" data-name="Container">
      <Heading5 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[54px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#45556c] text-[14px] top-[10px] whitespace-nowrap">
        <p className="leading-[20px]">Progress</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute h-[20px] left-[403px] top-0 w-[27px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#0f172b] text-[14px] top-[10px] whitespace-nowrap">
        <p className="leading-[20px]">50%</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[430px]" data-name="Container">
      <Container35 />
      <Container36 />
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-[#e2e8f0] h-[12px] left-0 rounded-[33554400px] top-[28px] w-[430px]" data-name="Background">
      <div className="absolute bg-[#155dfc] h-[12px] left-0 rounded-[33554400px] top-0 w-[215px]" data-name="Background" />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute h-[40px] left-[24px] top-0 w-[430px]" data-name="Container">
      <Container34 />
      <Background3 />
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute h-[20px] left-0 top-[4px] w-[83px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#45556c] text-[13.8px] top-[10px] whitespace-nowrap">
        <p className="leading-[20px]">Total Needed</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute h-[28px] left-[350px] top-0 w-[80px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#0f172b] text-[20px] top-[14px] whitespace-nowrap">
        <p className="leading-[28px]">$1500.00</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute h-[28px] left-0 top-0 w-[430px]" data-name="Container">
      <Container39 />
      <Container40 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute h-[20px] left-0 top-[4px] w-[83px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#45556c] text-[14px] top-[10px] whitespace-nowrap">
        <p className="leading-[20px]">Raised So Far</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute h-[28px] left-[360px] top-0 w-[70px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#008236] text-[20px] top-[14px] whitespace-nowrap">
        <p className="leading-[28px]">$750.00</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute h-[28px] left-0 top-[40px] w-[430px]" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute h-[20px] left-0 top-[18px] w-[76px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#45556c] text-[14px] top-[10px] whitespace-nowrap">
        <p className="leading-[20px]">Still Needed</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute h-[32px] left-[347px] top-[12px] w-[83px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[#1447e6] text-[24px] top-[16px] whitespace-nowrap">
        <p className="leading-[32px]">$750.00</p>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="absolute border-[#e2e8f0] border-solid border-t h-[45px] left-0 top-[80px] w-[430px]" data-name="HorizontalBorder">
      <Container44 />
      <Container45 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute h-[125px] left-[24px] top-[64px] w-[430px]" data-name="Container">
      <Container38 />
      <Container41 />
      <HorizontalBorder />
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute left-[151.5px] size-[20px] top-[14px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Component 1">
          <path d={svgPaths.p2f84f400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#155dfc] h-[48px] left-[24px] rounded-[8px] top-[213px] w-[430px]" data-name="Button">
      <Component1 />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-[229px] not-italic text-[17.7px] text-center text-white top-[24px] whitespace-nowrap">
        <p className="leading-[28px]">Donate Now</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[285px] w-[430px]" data-name="Container">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-[215px] not-italic text-[#45556c] text-[11.8px] text-center top-[8px] whitespace-nowrap">
        <p className="leading-[16px]">{`You'll be redirected to the veterinary clinic's secure payment page`}</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute h-[325px] left-px top-[71px] w-[478px]" data-name="Container">
      <Container33 />
      <Container37 />
      <Button1 />
      <Container46 />
    </div>
  );
}

function Component2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Component 1">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6H5.33333" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 8.66667H5.33333" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 11.3333H5.33333" id="Vector_5" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#155dfc] text-[13.1px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Invoice</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[6px] items-center left-[388px] top-[calc(50%-161.5px)]" data-name="Button">
      <Component2 />
      <Container47 />
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-white h-[397px] relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container31 />
      <Container32 />
      <Button2 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] w-full">
        <p className="leading-[16px] whitespace-pre-wrap">Follow Our Journey</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-[478px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[6px] pt-[24px] px-[24px] relative w-full">
        <Heading6 />
      </div>
    </div>
  );
}

function Component3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Component 1">
          <path d={svgPaths.p22916300} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2c68500} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M11.6667 4.33333H11.6733" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[13px] py-[9px] relative size-full">
          <Component3 />
          <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center whitespace-nowrap">
            <p className="leading-[20px]">View on Instagram</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="relative shrink-0 w-[478px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] px-[24px] relative w-full">
        <Button3 />
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start p-px relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container48 />
      <Container49 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start shrink-0 sticky top-0 w-full" data-name="Container">
      <BackgroundBorder5 />
      <BackgroundBorder6 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col h-full items-start relative shrink-0 w-[480px]" data-name="Container">
      <Container30 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex h-[1276px] items-center justify-between relative shrink-0 w-[1504px]">
      <Container5 />
      <Container29 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-[1504px]" data-name="Container">
      <Frame />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#eff6ff] gap-[32px] h-[1417px] items-center min-h-[1200px] pb-[32px] relative shrink-0 to-white w-full" data-name="Background">
      <BackgroundHorizontalBorderShadow />
      <Container4 />
    </div>
  );
}

export default function PetDetails() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Pet Details">
      <Background />
    </div>
  );
}