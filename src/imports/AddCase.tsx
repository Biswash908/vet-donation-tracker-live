import svgPaths from "./svg-m9jd8n08y2";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[686px]" data-name="Heading 4">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[24px] w-full">
        <p className="leading-[32px] whitespace-pre-wrap">Add New Case</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[686px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#717182] text-[16px] w-full">
        <p className="leading-[24px] whitespace-pre-wrap">Enter the details for the new case</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white col-1 content-stretch flex flex-col gap-[6px] items-start ml-0 mt-0 pt-[24px] px-[24px] relative row-1" data-name="Container">
      <Heading />
      <Container1 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[14px]">
        <p className="leading-[14px] whitespace-pre-wrap">Pet Name *</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bottom-[9.5px] content-stretch flex flex-col items-start left-[13px] overflow-clip pb-[2px] pr-[602.7px] pt-px top-[9.5px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">e.g., Max</p>
      </div>
    </div>
  );
}

function Container6() {
  return <div className="absolute bottom-[9.5px] left-[13px] top-[9.5px] w-[660px]" data-name="Container" />;
}

function Input() {
  return (
    <div className="bg-[#f3f3f5] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container5 />
        <Container6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[13.8px]">
        <p className="leading-[14px] whitespace-pre-wrap">Treatment Description *</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bottom-[35px] content-stretch flex flex-col items-start left-[13px] pr-[457px] top-[9px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Describe the treatment needed...</p>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-[#f3f3f5] h-[64px] min-h-[64px] relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="overflow-auto relative size-full">
        <Container8 />
        <div className="absolute bottom-[35px] left-[13px] top-[9px] w-[660px]" data-name="Rectangle" />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Textarea />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[13.7px]">
        <p className="leading-[14px] whitespace-pre-wrap">Total Cost/Debt Amount *</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bottom-[9.5px] content-stretch flex flex-col items-start left-[13px] overflow-clip pb-[2px] pr-[617.75px] pt-px top-[9.5px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">
        <p className="leading-[normal]">0.00</p>
      </div>
    </div>
  );
}

function Container12() {
  return <div className="h-[17px] shrink-0 w-[645px]" data-name="Container" />;
}

function RectangleAlignStretch() {
  return (
    <div className="content-stretch flex h-full items-start relative shrink-0" data-name="Rectangle:align-stretch">
      <div className="h-full min-w-[15px] opacity-0 shrink-0 w-[15px]" data-name="Rectangle" />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bottom-[9.5px] content-stretch flex items-center left-[13px] top-[9.5px]" data-name="Container">
      <Container12 />
      <RectangleAlignStretch />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f3f3f5] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container10 />
        <Container11 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Input1 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[14px]">
        <p className="leading-[14px] whitespace-pre-wrap">Vet Payment Link *</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bottom-[9.5px] content-stretch flex flex-col items-start left-[13px] overflow-clip pb-[2px] pr-[605.86px] pt-px top-[9.5px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#717182] text-[13.9px] whitespace-nowrap">
        <p className="leading-[normal]">https://...</p>
      </div>
    </div>
  );
}

function Container15() {
  return <div className="absolute bottom-[9.5px] left-[13px] top-[9.5px] w-[660px]" data-name="Container" />;
}

function Input2() {
  return (
    <div className="bg-[#f3f3f5] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container14 />
        <Container15 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label3 />
      <Input2 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[14px]">
        <p className="leading-[14px] whitespace-pre-wrap">Invoice Upload (PDF/Image)</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bottom-[9.5px] content-stretch flex flex-col items-start left-[13px] overflow-clip pb-[2px] pr-[547.73px] pt-px top-[9.5px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#717182] text-[13.8px] whitespace-nowrap">
        <p className="leading-[normal]">invoice.pdf</p>
      </div>
    </div>
  );
}

function Container19() {
  return <div className="absolute bottom-[9.5px] left-[13px] top-[9.5px] w-[614px]" data-name="Container" />;
}

function Input3() {
  return (
    <div className="bg-[#f3f3f5] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[8px]" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container18 />
        <Container19 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Component() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Component 1">
          <path d={svgPaths.p23ad1400} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p26e09a00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 2V10" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex h-[32px] items-center justify-center px-[11px] py-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Component />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Input3 />
      <Button />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label4 />
      <Container17 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[13.9px]">
        <p className="leading-[14px] whitespace-pre-wrap">Pet Photo</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bottom-[9.5px] content-stretch flex flex-col items-start left-[13px] overflow-clip pb-[2px] pr-[572.22px] pt-px top-[9.5px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#717182] text-[13.6px] whitespace-nowrap">
        <p className="leading-[normal]">pet.jpg</p>
      </div>
    </div>
  );
}

function Container23() {
  return <div className="absolute bottom-[9.5px] left-[13px] top-[9.5px] w-[614px]" data-name="Container" />;
}

function Input4() {
  return (
    <div className="bg-[#f3f3f5] flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[8px]" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container22 />
        <Container23 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Component1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Component 1">
          <path d={svgPaths.p23ad1400} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p26e09a00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 2V10" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white content-stretch flex h-[32px] items-center justify-center px-[11px] py-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Component1 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Input4 />
      <Button1 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label5 />
      <Container21 />
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[14px]">
        <p className="leading-[14px] whitespace-pre-wrap">Pet Story/Background</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bottom-[35px] content-stretch flex flex-col items-start left-[13px] pr-[521.66px] top-[9px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#717182] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">{`Share the pet's story...`}</p>
      </div>
    </div>
  );
}

function Textarea1() {
  return (
    <div className="bg-[#f3f3f5] h-[64px] min-h-[64px] relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="overflow-auto relative size-full">
        <Container25 />
        <div className="absolute bottom-[35px] left-[13px] top-[9px] w-[660px]" data-name="Rectangle" />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label6 />
      <Textarea1 />
    </div>
  );
}

function Label7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#0a0a0a] text-[14px]">
        <p className="leading-[14px] whitespace-pre-wrap">Social Media Link</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bottom-[9.5px] content-stretch flex flex-col items-start left-[13px] overflow-clip pb-[2px] pr-[510.12px] pt-px top-[9.5px]" data-name="Container">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#717182] text-[13.8px] whitespace-nowrap">
        <p className="leading-[normal]">https://instagram.com/...</p>
      </div>
    </div>
  );
}

function Container28() {
  return <div className="absolute bottom-[9.5px] left-[13px] top-[9.5px] w-[660px]" data-name="Container" />;
}

function Input5() {
  return (
    <div className="bg-[#f3f3f5] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container27 />
        <Container28 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label7 />
      <Input5 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white content-stretch flex h-[36px] items-center justify-center px-[17px] py-[9px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[20px]">Cancel</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#155dfc] content-stretch flex h-[36px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[20px]">Publish Case</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[12px] items-start justify-end pt-[16px] relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[686px]" data-name="Container">
      <Container4 />
      <Container7 />
      <Container9 />
      <Container13 />
      <Container16 />
      <Container20 />
      <Container24 />
      <Container26 />
      <Container29 />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-white col-1 content-stretch flex flex-col items-start ml-0 mt-[110px] pb-[24px] px-[24px] relative row-1" data-name="Container">
      <Container3 />
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <Container />
      <Container2 />
    </div>
  );
}

export default function AddCase() {
  return (
    <div className="bg-white content-stretch flex items-center relative size-full" data-name="Add Case">
      <Group />
    </div>
  );
}