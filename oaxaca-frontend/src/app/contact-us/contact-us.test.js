import React from "react";
import { shallow } from "enzyme";
import ContactUsPage from "../../app/contact-us/page";

describe("ContactUsPage Component", () => {
  it("should render without errors", () => {
    const wrapper = shallow(<ContactUsPage />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render the FAQ section with correct content", () => {
    const wrapper = shallow(<ContactUsPage />);
    console.log(wrapper.debug());
    const faqSection = wrapper.find('[data-testid="faq-container"]');
  
    const faqHeaders = faqSection.find("h3");
    expect(faqHeaders).toHaveLength(3);
    expect(faqHeaders.at(0).text()).toEqual("Do you cater for people with allergies?");
    expect(faqHeaders.at(1).text()).toEqual("Do you have vegetarian and vegan options?");
    expect(faqHeaders.at(2).text()).toEqual("What are your opening times?");
  
    const faqAnswers = faqSection.find("p");
    expect(faqAnswers).toHaveLength(3);
    expect(faqAnswers.at(0).text()).toEqual(
      "Yes, please let the staff know if you have any allergies and we can ensure you are catered for."
    );
    expect(faqAnswers.at(1).text()).toEqual(
      "Yes, we have multiple options all clearly marked on our menus."
    );
    expect(faqAnswers.at(2).text()).toEqual(
      "Our stores are open from 11:30-23:00, however holidays may affect this."
    );
  });

  it("should render the contact information section with correct content", () => {
    const wrapper = shallow(<ContactUsPage />);
    const contactInfoSection = wrapper.find(".text-xl");

    expect(contactInfoSection.text()).toContain("FAQs not helped?");
    expect(contactInfoSection.text()).toContain("Telephone: 0712345678");
    expect(contactInfoSection.text()).toContain("Email: oaxacahelp@gmail.com");
  });
});