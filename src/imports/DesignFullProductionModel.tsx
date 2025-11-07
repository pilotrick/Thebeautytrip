import svgPaths from "./svg-m0lndamsoo";
import imgImageTheGourmetHealingChef from "figma:asset/ef8fd2fdc4495e173da94e134dc8b51cfb1ee0e4.png";
import imgImageThePremierSanctuary from "figma:asset/c8b325dc4d0c386f8ea19539ee355a91a4214e82.png";
import imgImageTheGoldShuttle from "figma:asset/689a617ca1fef856199d4382a054c63ca8fb6e35.png";
import imgImageTheBeautyTripLogo from "figma:asset/14e163fabd1036dfe849086350b27b4780fe718d.png";
import imgImageWithFallback from "figma:asset/3b7566310fe7a610c1a1134a9766e0759c1e5ae3.png";

function Heading2() {
  return (
    <div className="absolute h-[60px] left-[24px] top-[96px] w-[848px]" data-name="Heading 2">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[60px] left-[423.56px] text-[40px] text-center text-nowrap text-white top-[-1px] tracking-[-0.8px] translate-x-[-50%] whitespace-pre">Dominican Republic Excellence</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[30px] left-[24px] top-[172px] w-[848px]" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Medium',_sans-serif] font-medium leading-[30px] left-[423.53px] text-[#b8985b] text-[20px] text-center text-nowrap top-0 tracking-[-0.16px] translate-x-[-50%] whitespace-pre">3 Procedures for the Price of 1 in the US</p>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-[98.01px] text-[24px] text-center text-white top-[0.67px] tracking-[-0.48px] translate-x-[-50%] w-[142px]">{`Injectables & Fillers`}</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[61.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[61.906px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] text-nowrap top-[-0.67px] tracking-[-0.16px] whitespace-pre">US Price</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[66.021px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[66.021px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[28px] left-0 text-[20px] text-nowrap text-white top-[-0.33px] tracking-[-0.16px] whitespace-pre">$3,500</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="box-border content-stretch flex h-[44.667px] items-center justify-between pb-[0.667px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[48px] relative shrink-0 w-[120.948px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-[120.948px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] top-[-0.67px] tracking-[-0.16px] w-[87px]">Beauty Trip Price</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[36px] relative shrink-0 w-[75.052px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[75.052px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-0 text-[#b8985b] text-[24px] text-nowrap top-[0.67px] tracking-[-0.16px] whitespace-pre">$1,200</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[108.667px] items-start relative shrink-0 w-full" data-name="Container">
      <Container />
      <Container1 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex h-[20.667px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[#e0b0ba] text-[16px] text-center text-nowrap tracking-[-0.16px] whitespace-pre">Save 66%</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[40.667px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[40.667px] items-start pb-0 pl-[62.438px] pr-[62.437px] pt-[18px] relative w-full">
          <Text4 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.05)] box-border content-stretch flex flex-col gap-[24px] h-[385.333px] items-start left-0 pb-[0.667px] pt-[32.667px] px-[32.667px] top-0 w-[261.333px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Heading3 />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[#b8985b] box-border content-stretch flex h-[30px] items-start left-[64.66px] px-[16px] py-[6px] top-[31.33px] w-[132.01px]" data-name="Text">
      <p className="font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] relative shrink-0 text-[#111111] text-[14px] text-center text-nowrap tracking-[-0.16px] whitespace-pre">MOST POPULAR</p>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[72px] left-[34px] top-[74px] w-[193.333px]" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-[97.08px] text-[24px] text-center text-white top-[0.67px] tracking-[-0.48px] translate-x-[-50%] w-[170px]">Smile Transformation</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[61.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[61.906px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] text-nowrap top-[-0.67px] tracking-[-0.16px] whitespace-pre">US Price</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[28px] relative shrink-0 w-[75.135px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[75.135px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[28px] left-0 text-[20px] text-nowrap text-white top-[-0.33px] tracking-[-0.16px] whitespace-pre">$18,000</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[44.667px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[44.667px] items-center justify-between pb-[0.667px] pt-0 px-0 relative w-full">
          <Text6 />
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[48px] relative shrink-0 w-[113.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-[113.406px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] top-[-0.67px] tracking-[-0.16px] w-[87px]">Beauty Trip Price</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[36px] relative shrink-0 w-[79.927px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[79.927px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-0 text-[#b8985b] text-[24px] text-nowrap top-[0.67px] tracking-[-0.16px] whitespace-pre">$5,400</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex h-[48px] items-center justify-between relative w-full">
          <Text8 />
          <Text9 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[108.667px] items-start left-[34px] top-[170px] w-[193.333px]" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Text10() {
  return (
    <div className="content-stretch flex h-[20.667px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[#e0b0ba] text-[16px] text-center text-nowrap tracking-[-0.16px] whitespace-pre">Save 70%</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[40.667px] items-start left-[34px] pb-0 pl-[61.313px] pr-[61.323px] pt-[18px] top-[310.67px] w-[193.333px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Text10 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.05)] h-[385.333px] left-[293.33px] top-0 w-[261.333px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#b8985b] border-solid inset-0 pointer-events-none" />
      <Text5 />
      <Heading5 />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-[98.34px] text-[24px] text-center text-white top-[0.67px] tracking-[-0.48px] translate-x-[-50%] w-[128px]">Med Spa Treatments</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[61.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[61.906px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] text-nowrap top-[-0.67px] tracking-[-0.16px] whitespace-pre">US Price</p>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[28px] relative shrink-0 w-[66.448px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[66.448px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[28px] left-0 text-[20px] text-nowrap text-white top-[-0.33px] tracking-[-0.16px] whitespace-pre">$4,500</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[44.667px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.667px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[44.667px] items-center justify-between pb-[0.667px] pt-0 px-0 relative w-full">
          <Text11 />
          <Text12 />
        </div>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[48px] relative shrink-0 w-[120.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-[120.938px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[#99a1af] text-[16px] top-[-0.67px] tracking-[-0.16px] w-[87px]">Beauty Trip Price</p>
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[36px] relative shrink-0 w-[75.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[75.063px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-0 text-[#b8985b] text-[24px] text-nowrap top-[0.67px] tracking-[-0.16px] whitespace-pre">$1,600</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text13 />
      <Text14 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[108.667px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex h-[20.667px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[#e0b0ba] text-[16px] text-center text-nowrap tracking-[-0.16px] whitespace-pre">Save 64%</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[40.667px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[40.667px] items-start pb-0 pt-[18px] px-[62.333px] relative w-full">
          <Text15 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.05)] box-border content-stretch flex flex-col gap-[24px] h-[385.333px] items-start left-[586.67px] pb-[0.667px] pt-[32.667px] px-[32.667px] top-0 w-[261.333px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Heading6 />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[385.333px] left-[24px] top-[266px] w-[848px]" data-name="Container">
      <Container4 />
      <Container9 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[40px] left-[94.36px] text-[#b8985b] text-[36px] text-center text-nowrap top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">800+</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[94.45px] text-[#99a1af] text-[16px] text-center text-nowrap top-[-0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Successful Treatments</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[12px] items-start relative shrink-0" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[40px] left-[94.3px] text-[#b8985b] text-[36px] text-center text-nowrap top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">99%</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[93.55px] text-[#99a1af] text-[16px] text-center text-nowrap top-[-0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Satisfaction Rate</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="[grid-area:1_/_2] content-stretch flex flex-col gap-[12px] items-start relative shrink-0" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[40px] left-[94.51px] text-[#b8985b] text-[36px] text-center text-nowrap top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">10+</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[94.32px] text-[#99a1af] text-[16px] text-center text-nowrap top-[-0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Certified Specialists</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="[grid-area:1_/_3] content-stretch flex flex-col gap-[12px] items-start relative shrink-0" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[40px] left-[94.43px] text-[#b8985b] text-[36px] text-center text-nowrap top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">24/7</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[94.35px] text-[#99a1af] text-[16px] text-center text-nowrap top-[-0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Concierge Support</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="[grid-area:1_/_4] content-stretch flex flex-col gap-[12px] items-start relative shrink-0" data-name="Container">
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute gap-[32px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[76px] left-[24px] top-[731.33px] w-[848px]" data-name="Container">
      <Container18 />
      <Container21 />
      <Container24 />
      <Container27 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[424.26px] text-[#99a1af] text-[16px] text-center text-nowrap top-[-0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Experience Dominican Excellence</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',_sans-serif] leading-[28px] left-[96.5px] not-italic text-[20px] text-center text-nowrap text-white top-[-1px] tracking-[2px] translate-x-[-50%] whitespace-pre">JENNY POLANCO</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[97.01px] text-[#99a1af] text-[14px] text-center text-nowrap top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">{`Fashion & Lifestyle`}</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[52px] items-start left-[49px] top-0 w-[192.875px]" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Container30() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] h-[48px] left-[289.88px] top-[2px] w-px" data-name="Container" />;
}

function Paragraph4() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',_sans-serif] leading-[28px] left-[96px] not-italic text-[20px] text-center text-nowrap text-white top-[-1px] tracking-[2px] translate-x-[-50%] whitespace-pre">MÓNICA VARELA</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[96.65px] text-[#99a1af] text-[14px] text-center text-nowrap top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Luxury Experiences</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[52px] items-start left-[338.88px] top-0 w-[192.99px]" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container32() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] h-[48px] left-[579.87px] top-[2px] w-px" data-name="Container" />;
}

function Paragraph6() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',_sans-serif] leading-[28px] left-[61px] not-italic text-[20px] text-center text-nowrap text-white top-[-1px] tracking-[2px] translate-x-[-50%] whitespace-pre">INDÓMITA</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[60.97px] text-[#99a1af] text-[14px] text-center text-nowrap top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">{`Art & Fashion`}</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[52px] items-start left-[628.87px] top-0 w-[121.135px]" data-name="Container">
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Container34() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] h-[48px] left-[798px] top-[2px] w-px" data-name="Container" />;
}

function Paragraph8() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',_sans-serif] leading-[28px] left-[52.26px] not-italic text-[20px] text-center text-nowrap text-white top-[-1px] tracking-[2px] translate-x-[-50%] whitespace-pre">JOARLA</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[52px] text-[#99a1af] text-[14px] text-center text-nowrap top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Larimar Jewelry</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[52px] items-start left-[107.64px] top-[100px] w-[103.708px]" data-name="Container">
      <Paragraph8 />
      <Paragraph9 />
    </div>
  );
}

function Container36() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] h-[48px] left-[259.34px] top-[102px] w-px" data-name="Container" />;
}

function Paragraph10() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',_sans-serif] leading-[28px] left-[66.16px] not-italic text-[20px] text-center text-nowrap text-white top-[-1px] tracking-[2px] translate-x-[-50%] whitespace-pre">HIPÓLITO</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[66.5px] text-[#99a1af] text-[14px] text-center text-nowrap top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Chacabana Tailoring</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[52px] items-start left-[308.34px] top-[100px] w-[132.604px]" data-name="Container">
      <Paragraph10 />
      <Paragraph11 />
    </div>
  );
}

function Container38() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] h-[48px] left-[488.95px] top-[102px] w-px" data-name="Container" />;
}

function Paragraph12() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',_sans-serif] leading-[28px] left-[77.5px] not-italic text-[20px] text-center text-nowrap text-white top-[-1px] tracking-[2px] translate-x-[-50%] whitespace-pre">BRUGAL 1888</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[77.16px] text-[#99a1af] text-[14px] text-center text-nowrap top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Premium Rum</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[52px] items-start left-[537.95px] top-[100px] w-[153.417px]" data-name="Container">
      <Paragraph12 />
      <Paragraph13 />
    </div>
  );
}

function Container40() {
  return <div className="absolute bg-[rgba(255,255,255,0.2)] h-[48px] left-[739.37px] top-[102px] w-px" data-name="Container" />;
}

function Paragraph14() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Tinos:Regular',_sans-serif] leading-[28px] left-[98.5px] not-italic text-[20px] text-center text-nowrap text-white top-[-1px] tracking-[2px] translate-x-[-50%] whitespace-pre">ARTURO FUENTE</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[98.25px] text-[#99a1af] text-[14px] text-center text-nowrap top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Premium Cigars</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[52px] items-start left-[326.17px] top-[200px] w-[195.656px]" data-name="Container">
      <Paragraph14 />
      <Paragraph15 />
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[252px] relative shrink-0 w-full" data-name="Container">
      <Container29 />
      <Container30 />
      <Container31 />
      <Container32 />
      <Container33 />
      <Container34 />
      <Container35 />
      <Container36 />
      <Container37 />
      <Container38 />
      <Container39 />
      <Container40 />
      <Container41 />
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[32px] h-[372.667px] items-start left-[24px] pb-0 pt-[64.667px] px-0 top-[887.33px] w-[848px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.667px_0px_0px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none" />
      <Paragraph1 />
      <Container42 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute bg-[#111111] h-[1356px] left-0 top-[1495.33px] w-[896px]" data-name="Section">
      <Heading2 />
      <Paragraph />
      <Container15 />
      <Container28 />
      <Container43 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute h-[60px] left-[24px] top-[96px] w-[848px]" data-name="Heading 2">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[60px] left-[424.85px] text-[#111111] text-[40px] text-center text-nowrap top-[-1px] tracking-[-0.8px] translate-x-[-50%] whitespace-pre">Your 10 day Sample Itinerary</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[54px] left-[112px] top-[188px] w-[672px]" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[27px] left-[336.13px] text-[#4a5565] text-[18px] text-center top-[-0.67px] tracking-[-0.16px] translate-x-[-50%] w-[670px]">Take your time to build your perfect experience. This journey is designed to fit your schedule and preferences.</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[36px] relative shrink-0 w-[9.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[9.875px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-[5.5px] text-[#b8985b] text-[24px] text-center text-nowrap top-[0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-[40px] p-[2px] rounded-[2.23696e+07px] size-[64px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e0b0ba] border-solid inset-0 pointer-events-none rounded-[2.23696e+07px]" />
      <Text16 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute h-[24px] left-0 top-[88px] w-[144px]" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[72.21px] text-[#111111] text-[16px] text-center text-nowrap top-[-0.67px] tracking-[-0.32px] translate-x-[-50%] whitespace-pre">Customize</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[40px] left-0 top-[124px] w-[144px]" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[72.21px] text-[#4a5565] text-[14px] text-center top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] w-[134px]">{`Select your MedSpa & dental treatments`}</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="[grid-area:1_/_1] relative shrink-0" data-name="Container">
      <Container44 />
      <Heading8 />
      <Paragraph17 />
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[36px] relative shrink-0 w-[14.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[14.313px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-[7.5px] text-[#b8985b] text-[24px] text-center text-nowrap top-[0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-[40px] p-[2px] rounded-[2.23696e+07px] size-[64px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e0b0ba] border-solid inset-0 pointer-events-none rounded-[2.23696e+07px]" />
      <Text17 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute h-[24px] left-0 top-[88px] w-[144px]" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[72.3px] text-[#111111] text-[16px] text-center text-nowrap top-[-0.67px] tracking-[-0.32px] translate-x-[-50%] whitespace-pre">Match</p>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[40px] left-0 top-[124px] w-[144px]" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[72.27px] text-[#4a5565] text-[14px] text-center top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] w-[84px]">Choose your specialist</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="[grid-area:1_/_2] relative shrink-0" data-name="Container">
      <Container46 />
      <Heading9 />
      <Paragraph18 />
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[36px] relative shrink-0 w-[14.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[14.344px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-[7.5px] text-[#b8985b] text-[24px] text-center text-nowrap top-[0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-[40px] pl-[2px] pr-[2.01px] py-[2px] rounded-[2.23696e+07px] size-[64px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e0b0ba] border-solid inset-0 pointer-events-none rounded-[2.23696e+07px]" />
      <Text18 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute h-[24px] left-0 top-[88px] w-[144px]" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[72.54px] text-[#111111] text-[16px] text-center text-nowrap top-[-0.67px] tracking-[-0.32px] translate-x-[-50%] whitespace-pre">Arrive</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute h-[60px] left-0 top-[124px] w-[144px]" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[72.49px] text-[#4a5565] text-[14px] text-center top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] w-[119px]">Land in Santo Domingo or Punta Cana</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="[grid-area:1_/_3] relative shrink-0" data-name="Container">
      <Container48 />
      <Heading10 />
      <Paragraph19 />
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[36px] relative shrink-0 w-[14.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[14.844px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-[7.5px] text-[#b8985b] text-[24px] text-center text-nowrap top-[0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">4</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-[40px] pl-[2px] pr-[2.01px] py-[2px] rounded-[2.23696e+07px] size-[64px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e0b0ba] border-solid inset-0 pointer-events-none rounded-[2.23696e+07px]" />
      <Text19 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="absolute h-[24px] left-0 top-[88px] w-[144px]" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[72.54px] text-[#111111] text-[16px] text-center text-nowrap top-[-0.67px] tracking-[-0.32px] translate-x-[-50%] whitespace-pre">Renew</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[40px] left-0 top-[124px] w-[144px]" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[72.39px] text-[#4a5565] text-[14px] text-center top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] w-[123px]">Minimal-downtime treatments</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="[grid-area:1_/_4] relative shrink-0" data-name="Container">
      <Container50 />
      <Heading11 />
      <Paragraph20 />
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[36px] relative shrink-0 w-[14.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[14.219px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-[7.5px] text-[#b8985b] text-[24px] text-center text-nowrap top-[0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">5</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-[40px] pl-[2px] pr-[2.01px] py-[2px] rounded-[2.23696e+07px] size-[64px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e0b0ba] border-solid inset-0 pointer-events-none rounded-[2.23696e+07px]" />
      <Text20 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="absolute h-[24px] left-0 top-[88px] w-[144px]" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[72.45px] text-[#111111] text-[16px] text-center text-nowrap top-[-0.67px] tracking-[-0.32px] translate-x-[-50%] whitespace-pre">Relax and Explore</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[20px] left-0 top-[124px] w-[144px]" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[72.48px] text-[#4a5565] text-[14px] text-center text-nowrap top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Luxury villa recovery</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="[grid-area:1_/_5] relative shrink-0" data-name="Container">
      <Container52 />
      <Heading12 />
      <Paragraph21 />
    </div>
  );
}

function Text21_6() {
  return (
    <div className="h-[36px] relative shrink-0 w-[14.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[14.219px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-[7.5px] text-[#b8985b] text-[24px] text-center text-nowrap top-[0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">6</p>
      </div>
    </div>
  );
}

function Container52_6() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-[40px] pl-[2px] pr-[2.01px] py-[2px] rounded-[2.23696e+07px] size-[64px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e0b0ba] border-solid inset-0 pointer-events-none rounded-[2.23696e+07px]" />
      <Text21_6 />
    </div>
  );
}

function Heading12_6() {
  return (
    <div className="absolute h-[48px] left-0 top-[88px] w-[144px]" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[72px] text-[#111111] text-[16px] text-center top-[-0.67px] tracking-[-0.32px] translate-x-[-50%] w-[130px]">Dominican Rum & Cigars</p>
    </div>
  );
}

function Paragraph21_6() {
  return (
    <div className="absolute h-[60px] left-0 top-[124px] w-[144px]" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[72px] text-[#4a5565] text-[14px] text-center top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] w-[120px]">Premium tasting experience with Arturo Fuente & Brugal</p>
    </div>
  );
}

function Container53_6() {
  return (
    <div className="[grid-area:1_/_6] relative shrink-0" data-name="Container">
      <Container52_6 />
      <Heading12_6 />
      <Paragraph21_6 />
    </div>
  );
}

function Text21_7() {
  return (
    <div className="h-[36px] relative shrink-0 w-[14.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[14.219px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-[7.5px] text-[#b8985b] text-[24px] text-center text-nowrap top-[0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">7</p>
      </div>
    </div>
  );
}

function Container52_7() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-[40px] pl-[2px] pr-[2.01px] py-[2px] rounded-[2.23696e+07px] size-[64px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e0b0ba] border-solid inset-0 pointer-events-none rounded-[2.23696e+07px]" />
      <Text21_7 />
    </div>
  );
}

function Heading12_7() {
  return (
    <div className="absolute h-[48px] left-0 top-[88px] w-[144px]" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[72px] text-[#111111] text-[16px] text-center top-[-0.67px] tracking-[-0.32px] translate-x-[-50%] w-[120px]">Saona Island Catamaran</p>
    </div>
  );
}

function Paragraph21_7() {
  return (
    <div className="absolute h-[60px] left-0 top-[124px] w-[144px]" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-[72px] text-[#4a5565] text-[14px] text-center top-[-0.33px] tracking-[-0.16px] translate-x-[-50%] w-[120px]">Private beach excursion with snorkeling and BBQ</p>
    </div>
  );
}

function Container53_7() {
  return (
    <div className="[grid-area:1_/_7] relative shrink-0" data-name="Container">
      <Container52_7 />
      <Heading12_7 />
      <Paragraph21_7 />
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute gap-[24px] grid grid-cols-[repeat(7,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[184px] left-[24px] top-[306px] w-[848px]" data-name="Container">
      <Container45 />
      <Container47 />
      <Container49 />
      <Container51 />
      <Container53 />
      <Container53_6 />
      <Container53_7 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#b8985b] h-[67px] left-[334.82px] rounded-[2.23696e+07px] top-[554px] w-[226.344px]" data-name="Button">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[27px] left-[48px] text-[18px] text-nowrap text-white top-[19.33px] tracking-[0.45px] whitespace-pre">Start Your Trip</p>
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute bg-white h-[717px] left-0 top-[2851.33px] w-[896px]" data-name="Section">
      <Heading7 />
      <Paragraph16 />
      <Container54 />
      <Button />
    </div>
  );
}

function Heading13() {
  return (
    <div className="absolute h-[48px] left-0 top-0 w-[848px]" data-name="Heading 2">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[48px] left-[424.3px] text-[#b8985b] text-[32px] text-center text-nowrap top-[0.33px] tracking-[1.6px] translate-x-[-50%] uppercase whitespace-pre">{`THE CURATOR'S 10-DAY STANDARD`}</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="absolute h-[54px] left-[40px] top-[64px] w-[768px]" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[27px] left-[384.2px] text-[#364153] text-[18px] text-center top-[-0.67px] tracking-[-0.16px] translate-x-[-50%] w-[720px]">A fully integrated, Uncompromising Aesthetic Standards journey. This is the ultimate baseline for seamless renewal</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute h-[477px] left-0 rounded-[4px] top-0 w-[848px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-4 border-[#b8985b] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#b8985b] relative rounded-[2.23696e+07px] shrink-0 size-[12px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-gray-300 relative rounded-[2.23696e+07px] shrink-0 size-[10px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[10px]" />
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute box-border content-stretch flex gap-[7px] h-[10px] items-start justify-center left-0 pb-0 pl-0 pr-px top-[493px] w-[848px]" data-name="Container">
      <Button1 />
      {[...Array(2).keys()].map((_, i) => (
        <Button2 key={i} />
      ))}
    </div>
  );
}

function ImageTheGourmetHealingChef() {
  return (
    <div className="absolute h-[503px] left-0 top-0 w-[848px]" data-name="Image (The Gourmet Healing Chef)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageTheGourmetHealingChef} />
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[30px] left-[400.38px] text-[20px] text-center text-nowrap text-white top-0 tracking-[-0.16px] translate-x-[-50%] whitespace-pre">The Gourmet Healing Chef</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute bg-gradient-to-t box-border content-stretch flex flex-col from-[rgba(0,0,0,0.7)] h-[78px] items-start left-0 pb-0 pt-[24px] px-[24px] to-[rgba(0,0,0,0)] top-[425px] w-[848px]" data-name="Container">
      <Paragraph23 />
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute h-[503px] left-0 top-0 w-[848px]" data-name="Container">
      <ImageTheGourmetHealingChef />
      <Container57 />
    </div>
  );
}

function ImageThePremierSanctuary() {
  return (
    <div className="absolute h-[503px] left-0 top-0 w-[848px]" data-name="Image (The Premier Sanctuary)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageThePremierSanctuary} />
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[30px] left-[400.51px] text-[20px] text-center text-nowrap text-white top-0 tracking-[-0.16px] translate-x-[-50%] whitespace-pre">The Premier Sanctuary</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute bg-gradient-to-t box-border content-stretch flex flex-col from-[rgba(0,0,0,0.7)] h-[78px] items-start left-0 pb-0 pt-[24px] px-[24px] to-[rgba(0,0,0,0)] top-[425px] w-[848px]" data-name="Container">
      <Paragraph24 />
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute h-[503px] left-0 opacity-0 top-0 w-[848px]" data-name="Container">
      <ImageThePremierSanctuary />
      <Container59 />
    </div>
  );
}

function ImageTheGoldShuttle() {
  return (
    <div className="absolute h-[503px] left-0 top-0 w-[848px]" data-name="Image (The Gold Shuttle)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageTheGoldShuttle} />
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[30px] left-[400.56px] text-[20px] text-center text-nowrap text-white top-0 tracking-[-0.16px] translate-x-[-50%] whitespace-pre">The Gold Shuttle</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute bg-gradient-to-t box-border content-stretch flex flex-col from-[rgba(0,0,0,0.7)] h-[78px] items-start left-0 pb-0 pt-[24px] px-[24px] to-[rgba(0,0,0,0)] top-[425px] w-[848px]" data-name="Container">
      <Paragraph25 />
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute h-[503px] left-0 opacity-0 top-0 w-[848px]" data-name="Container">
      <ImageTheGoldShuttle />
      <Container61 />
    </div>
  );
}

function ExperienceImageSlider() {
  return (
    <div className="absolute h-[503px] left-0 top-[150px] w-[848px]" data-name="ExperienceImageSlider">
      <Container55 />
      <Container56 />
      <Container58 />
      <Container60 />
      <Container62 />
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[653px] relative shrink-0 w-full" data-name="Container">
      <Heading13 />
      <Paragraph22 />
      <ExperienceImageSlider />
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[42px] left-[423.87px] text-[#111111] text-[28px] text-center text-nowrap top-[0.33px] tracking-[-0.28px] translate-x-[-50%] whitespace-pre">Explore Your Journey Options</p>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[36px] left-0 text-[#b8985b] text-[24px] text-nowrap top-[0.67px] tracking-[0.48px] whitespace-pre">Solo Plus</p>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-0.67px] tracking-[-0.16px] whitespace-pre">14 Nights / 1 Guest</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[30px] left-0 text-[#b8985b] text-[20px] text-nowrap top-0 tracking-[-0.16px] whitespace-pre">$9,800 Est.</p>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph26 />
      <Paragraph27 />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[22.75px] left-0 text-[#d1d5dc] text-[14px] top-0 tracking-[-0.16px] w-[314px]">Extended Wellness Focus: Two extra Lymphatic Drainage Massages (LDMs) included</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#b8985b] h-[45px] relative rounded-[2.23696e+07px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[21px] left-[16px] text-[#111111] text-[14px] text-nowrap top-[12.33px] tracking-[0.28px] whitespace-pre">SELECT THIS PACKAGE</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="[grid-area:1_/_1] bg-[#111111] relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#b8985b] border-solid inset-0 pointer-events-none shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[2px] pt-[26px] px-[26px] relative size-full">
          <Heading4 />
          <Container64 />
          <Paragraph28 />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[36px] left-0 text-[#b8985b] text-[24px] text-nowrap top-[0.67px] tracking-[0.48px] whitespace-pre">Smile Transformation</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-0.67px] tracking-[-0.16px] whitespace-pre">10 Nights / 1 Guest</p>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[30px] left-0 text-[#b8985b] text-[20px] text-nowrap top-0 tracking-[-0.16px] whitespace-pre">$8,500 Est.</p>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph29 />
      <Paragraph30 />
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[22.75px] left-0 text-[#d1d5dc] text-[14px] top-0 tracking-[-0.16px] w-[351px]">Complete Smile Renewal: Full veneers transformation with teeth whitening and comprehensive dental care</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#b8985b] h-[45px] relative rounded-[2.23696e+07px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[21px] left-[16px] text-[#111111] text-[14px] text-nowrap top-[12.33px] tracking-[0.28px] whitespace-pre">SELECT THIS PACKAGE</p>
    </div>
  );
}

function Container67() {
  return (
    <div className="[grid-area:1_/_2] bg-[#111111] relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#b8985b] border-solid inset-0 pointer-events-none shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[2px] pt-[26px] px-[26px] relative size-full">
          <Heading15 />
          <Container66 />
          <Paragraph31 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Heading16() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[36px] left-0 text-[#b8985b] text-[24px] text-nowrap top-[0.67px] tracking-[0.48px] whitespace-pre">The Duo Retreat</p>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-0.67px] tracking-[-0.16px] whitespace-pre">10 Nights / 2 Guests</p>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[30px] left-0 text-[#b8985b] text-[20px] text-nowrap top-0 tracking-[-0.16px] whitespace-pre">$14,500 Est.</p>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph32 />
      <Paragraph33 />
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[22.75px] left-0 text-[#d1d5dc] text-[14px] top-0 tracking-[-0.16px] w-[347px]">Companion Comfort: Dedicated 2nd master suite access and enhanced Gourmet Healing Chef options</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#b8985b] h-[45px] relative rounded-[2.23696e+07px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[21px] left-[16px] text-[#111111] text-[14px] text-nowrap top-[12.33px] tracking-[0.28px] whitespace-pre">SELECT THIS PACKAGE</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="[grid-area:2_/_1] bg-[#111111] relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#b8985b] border-solid inset-0 pointer-events-none shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[2px] pt-[26px] px-[26px] relative size-full">
          <Heading16 />
          <Container68 />
          <Paragraph34 />
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function Heading17() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[36px] left-0 text-[#b8985b] text-[24px] text-nowrap top-[0.67px] tracking-[0.48px] whitespace-pre">The Group Platinum</p>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-0.67px] tracking-[-0.16px] whitespace-pre">12 Nights / 4 Guests</p>
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[30px] left-0 text-[#b8985b] text-[20px] text-nowrap top-0 tracking-[-0.16px] whitespace-pre">$23,000 Est.</p>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph35 />
      <Paragraph36 />
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[22.75px] left-0 text-[#d1d5dc] text-[14px] top-0 tracking-[-0.16px] w-[351px]">The Bespoke Sanctuary access with private pool and full-time Blush-Tie Coordinator</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#b8985b] h-[45px] relative rounded-[2.23696e+07px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[21px] left-[16px] text-[#111111] text-[14px] text-nowrap top-[12.33px] tracking-[0.28px] whitespace-pre">SELECT THIS PACKAGE</p>
    </div>
  );
}

function Container71() {
  return (
    <div className="[grid-area:2_/_2] bg-[#111111] relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#b8985b] border-solid inset-0 pointer-events-none shadow-[0px_2px_8px_0px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[2px] pt-[26px] px-[26px] relative size-full">
          <Heading17 />
          <Container70 />
          <Paragraph37 />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function PackageCarousel() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[609px] relative shrink-0 w-full" data-name="PackageCarousel">
      <Container65 />
      <Container67 />
      <Container69 />
      <Container71 />
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] h-[683px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading14 />
      <PackageCarousel />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute bg-neutral-50 box-border content-stretch flex flex-col gap-[64px] h-[1640px] items-start left-0 pb-0 pt-[96px] px-[24px] top-[3568.33px] w-[896px]" data-name="Section">
      <Container63 />
      <Container72 />
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute h-[42px] left-0 top-0 w-[21.542px]" data-name="Text">
      <p className="absolute font-['Space_Grotesk:Bold',_'Noto_Sans_Symbols2:Regular',_sans-serif] font-bold leading-[42px] left-0 text-[#b8985b] text-[28px] text-nowrap top-[0.33px] tracking-[0.56px] whitespace-pre">✓</p>
    </div>
  );
}

function Heading18() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Heading 3">
      <Text21 />
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[42px] left-[33.54px] text-[#111111] text-[28px] text-nowrap top-[0.33px] tracking-[0.56px] whitespace-pre">YOUR NEXT 24 HOURS, SECURED</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_62_1358)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e012060} id="Vector_2" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_62_1358">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container73() {
  return (
    <div className="bg-[#b8985b] relative rounded-[2.23696e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon />
      </div>
    </div>
  );
}

function Heading19() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[24px] left-0 text-[#111111] text-[16px] text-nowrap top-[-0.67px] tracking-[-0.32px] whitespace-pre">Step 1: Concierge Introduction</p>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[#364153] text-[14px] text-nowrap top-[-0.33px] tracking-[-0.16px] whitespace-pre">Your dedicated Coordinator will call you personally to begin the validation process</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[48px] relative shrink-0 w-[543.052px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[48px] items-start relative w-[543.052px]">
        <Heading19 />
        <Paragraph38 />
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex gap-[16px] h-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container73 />
      <Container74 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_62_1358)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e012060} id="Vector_2" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_62_1358">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container76() {
  return (
    <div className="bg-[#b8985b] relative rounded-[2.23696e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Heading20() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[24px] left-0 text-[#111111] text-[16px] text-nowrap top-[-0.67px] tracking-[-0.32px] whitespace-pre">Step 2: The Confidence Kit Delivered</p>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[#364153] text-[14px] text-nowrap top-[-0.33px] tracking-[-0.16px] whitespace-pre">Your secure email containing the pre-care guides and sample healing menus will arrive shortly</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[48px] relative shrink-0 w-[618.469px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[48px] items-start relative w-[618.469px]">
        <Heading20 />
        <Paragraph39 />
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex gap-[16px] h-[48px] items-start relative shrink-0 w-full" data-name="Container">
      <Container76 />
      <Container77 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_62_1358)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3e012060} id="Vector_2" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_62_1358">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container79() {
  return (
    <div className="bg-[#b8985b] relative rounded-[2.23696e+07px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Heading21() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[24px] left-0 text-[#111111] text-[16px] text-nowrap top-[-0.67px] tracking-[-0.32px] whitespace-pre">Step 3: Locking Down the Luxury</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[#364153] text-[14px] top-[-0.33px] tracking-[-0.16px] w-[699px]">We immediately begin cross-referencing your preferred properties with current availability to secure your perfect sanctuary</p>
    </div>
  );
}

function Container80() {
  return (
    <div className="basis-0 grow h-[68px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[68px] items-start relative w-full">
        <Heading21 />
        <Paragraph40 />
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex gap-[16px] h-[68px] items-start relative shrink-0 w-full" data-name="Container">
      <Container79 />
      <Container80 />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[196px] items-start relative shrink-0 w-full" data-name="Container">
      <Container75 />
      <Container78 />
      <Container81 />
    </div>
  );
}

function Container83() {
  return (
    <div className="bg-[#fffef8] h-[330px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#b8985b] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] h-[330px] items-start pb-[2px] pt-[34px] px-[34px] relative w-full">
          <Heading18 />
          <Container82 />
        </div>
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[490px] items-start left-0 pb-0 pt-[80px] px-[24px] top-[5208.33px] w-[896px]" data-name="Section">
      <Container83 />
    </div>
  );
}

function ImageTheBeautyTripLogo() {
  return (
    <div className="opacity-60 relative shrink-0 size-[160px]" data-name="Image (The Beauty Trip Logo)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageTheBeautyTripLogo} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[160px]" />
    </div>
  );
}

function Heading22() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[#111111] text-[14px] text-nowrap top-[-0.33px] tracking-[-0.28px] whitespace-pre">Important Legal Notice</p>
    </div>
  );
}

function BoldText() {
  return (
    <div className="absolute content-stretch flex h-[15.333px] items-start left-0 top-[2px] w-[88.469px]" data-name="Bold Text">
      <p className="font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[19.5px] relative shrink-0 text-[#4a5565] text-[12px] text-nowrap tracking-[-0.16px] whitespace-pre">The Beauty Trip</p>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[58.5px] relative shrink-0 w-full" data-name="Paragraph">
      <BoldText />
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[19.5px] left-0 text-[#4a5565] text-[12px] top-0 tracking-[-0.16px] w-[643px]">is a US-based medical tourism concierge service. We coordinate travel, accommodations, and appointments with independent medical providers in the Dominican Republic. We do not provide medical services, advice, or guarantees of treatment outcomes.</p>
    </div>
  );
}

function BoldText1() {
  return (
    <div className="absolute content-stretch flex h-[15.333px] items-start left-0 top-[2px] w-[113.948px]" data-name="Bold Text">
      <p className="font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[19.5px] relative shrink-0 text-[#4a5565] text-[12px] text-nowrap tracking-[-0.16px] whitespace-pre">No Medical Liability:</p>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[58.5px] relative shrink-0 w-full" data-name="Paragraph">
      <BoldText1 />
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[19.5px] left-0 text-[#4a5565] text-[12px] top-0 tracking-[-0.16px] w-[664px]">All medical procedures are performed by licensed, independent practitioners in the Dominican Republic. The Beauty Trip is not responsible for the medical care provided, treatment outcomes, complications, or any adverse effects. Clients assume all medical risks associated with their chosen procedures.</p>
    </div>
  );
}

function BoldText2() {
  return (
    <div className="absolute content-stretch flex h-[15.333px] items-start left-0 top-[2px] w-[148.188px]" data-name="Bold Text">
      <p className="font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[19.5px] relative shrink-0 text-[#4a5565] text-[12px] text-nowrap tracking-[-0.16px] whitespace-pre">Not Suitable for Everyone:</p>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[58.5px] relative shrink-0 w-full" data-name="Paragraph">
      <BoldText2 />
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[19.5px] left-0 text-[#4a5565] text-[12px] top-0 tracking-[-0.16px] w-[669px]">Medical tourism may not be appropriate for individuals with certain pre-existing conditions, those requiring complex follow-up care, or individuals unable to travel. Clients should consult with their US-based physician before booking any medical procedures abroad.</p>
    </div>
  );
}

function BoldText3() {
  return (
    <div className="absolute content-stretch flex h-[15.333px] items-start left-0 top-[2px] w-[137.062px]" data-name="Bold Text">
      <p className="font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[19.5px] relative shrink-0 text-[#4a5565] text-[12px] text-nowrap tracking-[-0.16px] whitespace-pre">Financial Responsibility:</p>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[58.5px] relative shrink-0 w-full" data-name="Paragraph">
      <BoldText3 />
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[19.5px] left-0 text-[#4a5565] text-[12px] top-0 tracking-[-0.16px] w-[665px]">All pricing is subject to change based on specialist assessment. Clients are responsible for all costs associated with complications, extended stays, or additional medical care required. Travel insurance covering medical tourism is strongly recommended.</p>
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[12px] top-0 tracking-[-0.16px] w-[662px]">© 2025 The Beauty Trip LLC. Based in the United States. Dominican Republic operations coordinated through licensed local partners.</p>
    </div>
  );
}

function Container84() {
  return (
    <div className="basis-0 grow h-[350px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[12px] h-[350px] items-start relative w-full">
        <Heading22 />
        <Paragraph41 />
        <Paragraph42 />
        <Paragraph43 />
        <Paragraph44 />
        <Paragraph45 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex gap-[16px] h-[350px] items-start relative shrink-0 w-full" data-name="Container">
      <ImageTheBeautyTripLogo />
      <Container84 />
    </div>
  );
}

function Section4() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex flex-col h-[470.667px] items-start left-0 pb-0 pt-[48.667px] px-[24px] top-[5698.33px] w-[896px]" data-name="Section">
      <div aria-hidden="true" className="absolute border-[0.667px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container85 />
    </div>
  );
}

function FigmaImageWithFallback() {
  return (
    <div className="absolute h-[663.333px] left-0 top-0 w-[896px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container86() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.45)] h-[663.333px] left-0 to-[rgba(255,255,255,0.35)] top-0 via-50% via-[rgba(255,255,255,0.25)] w-[896px]" data-name="Container" />;
}

function Container87() {
  return (
    <div className="absolute h-[663.333px] left-0 top-0 w-[896px]" data-name="Container">
      <FigmaImageWithFallback />
      <Container86 />
    </div>
  );
}

function ImageTheBeautyTripLogo1() {
  return (
    <div className="h-[465.917px] relative shadow-[0px_4px_24px_0px_rgba(255,255,255,0.8)] shrink-0 w-full" data-name="Image (The Beauty Trip Logo)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageTheBeautyTripLogo} />
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[22.5px] left-[233.34px] text-[15px] text-center text-nowrap text-white top-[0.33px] tracking-[3.75px] translate-x-[-50%] uppercase whitespace-pre">From take off to Total renewal!</p>
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[490.417px] relative shrink-0 w-[465.917px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[490.417px] items-start relative w-[465.917px]">
        <ImageTheBeautyTripLogo1 />
        <Paragraph46 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[123.188px] relative shrink-0 w-[848px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[123.188px] relative w-[848px]">
        <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[61.6px] left-[424.43px] text-[#111111] text-[56px] text-center top-[-0.33px] tracking-[-1.12px] translate-x-[-50%] w-[569px]">Your Island Sanctuary Is Waiting</p>
      </div>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="h-[72px] opacity-80 relative shrink-0 w-[672px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[72px] relative w-[672px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[36px] left-[336.35px] text-[#111111] text-[24px] text-center top-[0.67px] tracking-[-0.24px] translate-x-[-50%] w-[503px]">Uncompromising Aesthetic Standards in the Dominican Republic</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[8px] h-[663.333px] items-center justify-center left-0 pb-[80px] pt-0 px-0 top-0 w-[896px]" data-name="Container">
      <Container88 />
      <Heading1 />
      <Paragraph47 />
    </div>
  );
}

function Section5() {
  return (
    <div className="absolute h-[663.333px] left-0 overflow-clip top-0 w-[896px]" data-name="Section">
      <Container87 />
      <Container89 />
    </div>
  );
}

function Heading23() {
  return (
    <div className="absolute h-[60px] left-[24px] top-[80px] w-[848px]" data-name="Heading 2">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[60px] left-[423.69px] text-[#111111] text-[40px] text-center text-nowrap top-[-1px] tracking-[-0.8px] translate-x-[-50%] whitespace-pre">SECURE YOUR RENEWAL</p>
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Bold',_'Noto_Sans_Symbols2:Regular',_sans-serif] font-bold leading-[27px] left-[366.29px] text-[#b8985b] text-[18px] text-center top-[-0.67px] tracking-[0.36px] translate-x-[-50%] w-[700px]">✦ Take your time to build your perfect experience. You can modify selections and return anytime. ✦</p>
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute bg-[#fffef8] box-border content-stretch flex flex-col h-[90px] items-start left-[64px] pb-[2px] pt-[18px] px-[18px] rounded-[4px] top-[172px] w-[768px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#b8985b] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Paragraph48 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p30140580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container91() {
  return (
    <div className="absolute bg-[#b8985b] content-stretch flex items-center justify-center left-[138px] rounded-[2.23696e+07px] size-[64px] top-0" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Heading24() {
  return (
    <div className="absolute h-[42px] left-0 top-[80px] w-[340px]" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[42px] left-[170.4px] text-[#111111] text-[28px] text-center text-nowrap top-[0.33px] tracking-[-0.56px] translate-x-[-50%] whitespace-pre">The Private Renewal</p>
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="absolute h-[24px] left-0 top-[134px] w-[340px]" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[170.48px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-0.67px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Your Personalized Blueprint for Confidence</p>
    </div>
  );
}

function Container92() {
  return (
    <div className="h-[158px] relative shrink-0 w-full" data-name="Container">
      <Container91 />
      <Heading24 />
      <Paragraph49 />
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[#b8985b] h-[59px] relative rounded-[2.23696e+07px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Space_Grotesk:Medium',_sans-serif] font-medium leading-[27px] left-[32px] text-[18px] text-nowrap text-white top-[15.33px] tracking-[0.36px] whitespace-pre">CURATE MY JOURNEY</p>
    </div>
  );
}

function Container93() {
  return (
    <div className="[grid-area:1_/_1] relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#b8985b] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start pb-[2px] pt-[34px] px-[34px] relative size-full">
          <Container92 />
          <Button8 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p36a31480} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container94() {
  return (
    <div className="absolute bg-[#e0b0ba] content-stretch flex items-center justify-center left-[138px] rounded-[2.23696e+07px] size-[64px] top-0" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Heading25() {
  return (
    <div className="absolute h-[42px] left-0 top-[80px] w-[340px]" data-name="Heading 3">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[42px] left-[170.32px] text-[#111111] text-[28px] text-center text-nowrap top-[0.33px] tracking-[-0.56px] translate-x-[-50%] whitespace-pre">The Collective Experience</p>
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="absolute h-[48px] left-0 top-[134px] w-[340px]" data-name="Paragraph">
      <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[24px] left-[170.04px] text-[#4a5565] text-[16px] text-center top-[-0.67px] tracking-[-0.16px] translate-x-[-50%] w-[309px]">Bespoke group journeys for celebrations and milestones</p>
    </div>
  );
}

function Container95() {
  return (
    <div className="h-[182px] relative shrink-0 w-full" data-name="Container">
      <Container94 />
      <Heading25 />
      <Paragraph50 />
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#111111] h-[59px] relative rounded-[2.23696e+07px] shrink-0 w-full" data-name="Button">
      <p className="absolute font-['Space_Grotesk:Medium',_sans-serif] font-medium leading-[27px] left-[32px] text-[18px] text-nowrap text-white top-[15.33px] tracking-[0.36px] whitespace-pre">Plan Our Celebration</p>
    </div>
  );
}

function Container96() {
  return (
    <div className="[grid-area:1_/_2] relative shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e0b0ba] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start pb-[2px] pt-[34px] px-[34px] relative size-full">
          <Container95 />
          <Button9 />
        </div>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="absolute gap-[32px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[333px] left-[24px] top-[326px] w-[848px]" data-name="Container">
      <Container93 />
      <Container96 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[24px] size-[20px] top-[12.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2c0b1100} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute h-[21px] left-[52px] top-[12px] w-[344.26px]" data-name="Text">
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[21px] left-[172.5px] text-[#111111] text-[14px] text-center text-nowrap top-[0.33px] tracking-[-0.16px] translate-x-[-50%] whitespace-pre">Groups 2+ receive 5-10% discount on core packages</p>
    </div>
  );
}

function Container98() {
  return (
    <div className="absolute bg-[#e0b0ba] h-[45px] left-[237.87px] rounded-[2.23696e+07px] top-[707px] w-[420.26px]" data-name="Container">
      <Icon5 />
      <Text22 />
    </div>
  );
}

function Section6() {
  return (
    <div className="absolute bg-white h-[832px] left-0 top-[663.33px] w-[896px]" data-name="Section">
      <Heading23 />
      <Container90 />
      <Container97 />
      <Container98 />
    </div>
  );
}

function HomePage() {
  return (
    <div className="absolute h-[6169px] left-0 top-0 w-[896px]" data-name="HomePage">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_62_1366)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #B8985B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p14d10c00} id="Vector_2" stroke="var(--stroke-0, #B8985B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 8H14.6667" id="Vector_3" stroke="var(--stroke-0, #B8985B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_62_1366">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[13.26px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[13.26px]">
        <p className="absolute font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[20px] left-0 text-[#111111] text-[14px] text-nowrap top-[-0.33px] tracking-[-0.16px] whitespace-pre">🇺🇸</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] h-[40px] items-center left-0 pl-[18px] pr-[2px] py-[2px] rounded-[2.23696e+07px] top-0 w-[73.26px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#b8985b] border-solid inset-0 pointer-events-none rounded-[2.23696e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon6 />
      <Text23 />
    </div>
  );
}

function LanguageSelector() {
  return (
    <div className="absolute h-[40px] left-[798.74px] top-[2080px] w-[73.26px]" data-name="LanguageSelector">
      <Button10 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[26px] size-[16px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p399eca00} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pc93b400} id="Vector_2" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function HomePage1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] h-[52px] left-[706.24px] rounded-[2.23696e+07px] top-[16px] w-[165.76px]" data-name="HomePage">
      <div aria-hidden="true" className="absolute border-2 border-[#b8985b] border-solid inset-0 pointer-events-none rounded-[2.23696e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon7 />
      <p className="absolute font-['Space_Grotesk:Bold',_sans-serif] font-bold leading-[24px] left-[50px] text-[#111111] text-[16px] text-nowrap top-[13.33px] tracking-[-0.16px] whitespace-pre">My Booking</p>
    </div>
  );
}

export default function DesignFullProductionModel() {
  return (
    <div className="bg-[#f7f7f7] relative size-full" data-name="Design Full Production Model">
      <HomePage />
      <LanguageSelector />
      <HomePage1 />
    </div>
  );
}