import svgPaths from "./svg-hvobsdhdeq";

function Component() {
  return (
    <div className="-translate-y-1/2 absolute h-[28px] left-[14px] top-[calc(50%+0.5px)] w-[27px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 28">
        <g id="Component 1">
          <path d="M13.5 2.33333V25.6667" id="Vector" stroke="var(--stroke-0, #555555)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p20d0f00} id="Vector_2" stroke="var(--stroke-0, #555555)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#f6f6f6] border border-[#e5e5e5] border-solid h-[59px] left-[46px] overflow-clip rounded-[14px] top-[157px] w-[685px]">
      <Component />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] h-[27px] justify-center leading-[0] left-[63px] not-italic text-[#848484] text-[24px] top-[29.5px] w-[79px]">
        <p className="leading-[28px] whitespace-pre-wrap">0.00</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[46px] top-[114px]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-[46px] not-italic text-[#0f172b] text-[20px] top-[128px] w-[309px]">
        <p className="leading-[28px] whitespace-pre-wrap">Donation Amount *</p>
      </div>
      <Frame />
    </div>
  );
}

function Component1() {
  return (
    <div className="-translate-y-1/2 absolute left-[20px] size-[23px] top-1/2" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <g id="Component 1">
          <path d={svgPaths.p3f1ea400} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p261fe000} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#f6f6f6] border border-[#e5e5e5] border-solid h-[59px] left-[46px] overflow-clip rounded-[14px] top-[273px] w-[685px]">
      <Component1 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] h-[24px] justify-center leading-[0] left-[59px] not-italic text-[20px] text-black top-[calc(50%+0.5px)] w-[114px]">
        <p className="leading-[28px] whitespace-pre-wrap">02/12/2026</p>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[46px] top-[230px]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-[46px] not-italic text-[#0f172b] text-[20px] top-[244px] w-[309px]">
        <p className="leading-[28px] whitespace-pre-wrap">Donation Date *</p>
      </div>
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return <div className="absolute bg-[#f6f6f6] border border-[#e5e5e5] border-solid h-[59px] left-[46px] rounded-[14px] top-[389px] w-[685px]" />;
}

function Group2() {
  return (
    <div className="absolute contents left-[46px] top-[346px]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-[46px] not-italic text-[#0f172b] text-[20px] top-[360px] w-[309px]">
        <p className="leading-[28px] whitespace-pre-wrap">Donor Name (Optional)</p>
      </div>
      <Frame2 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-[#f6f6f6] border border-[#e5e5e5] border-solid h-[59px] left-[46px] overflow-clip rounded-[14px] top-[491px] w-[309px]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-[calc(50%-35.5px)] not-italic text-[24px] text-black top-[calc(50%+0.5px)] w-[71px]">
        <p className="leading-[28px] whitespace-pre-wrap">Cancel</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[#4e95ff] h-[59px] left-[422px] overflow-clip rounded-[14px] top-[491px] w-[309px]">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] h-[54px] justify-center leading-[0] left-[calc(50%-80.5px)] not-italic text-[24px] text-white top-[calc(50%+0.5px)] w-[162px]">
        <p className="leading-[28px] whitespace-pre-wrap">Add Donation</p>
      </div>
    </div>
  );
}

export default function LoggingDonation() {
  return (
    <div className="bg-white overflow-clip relative rounded-[34px] size-full" data-name="Logging Donation">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Segoe_UI_Symbol:Regular',sans-serif] justify-center leading-[0] left-[46px] not-italic text-[#0f172b] text-[32px] top-[57px] w-[309px]">
        <p className="leading-[28px] whitespace-pre-wrap">Log New Donation</p>
      </div>
      <Group />
      <Group1 />
      <Group2 />
      <Frame3 />
      <Frame4 />
    </div>
  );
}