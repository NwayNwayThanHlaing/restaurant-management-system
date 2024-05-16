import React from "react";
import { shallow } from "enzyme";
import AboutUsPage from "../../app/about-us/page";

describe("AboutUsPage Component", () => {
  it("should render without errors", () => {
    const wrapper = shallow(<AboutUsPage />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render the 'About Us' heading", () => {
    const wrapper = shallow(<AboutUsPage />);
    expect(wrapper.find("h4").text()).toEqual("About Us");
  });

  it("should render paragraphs with correct content", () => {
    const wrapper = shallow(<AboutUsPage />);
    const paragraphs = wrapper.find("p");
    expect(paragraphs).toHaveLength(2);

    expect(paragraphs.at(0).text()).toContain(
      "We are a restaurant group that have been slowly growing our London"
    );
    expect(paragraphs.at(1).text()).toContain(
      "Our head chef has worked tirelessly to achieve her dream of sharing"
    );
  });

  it("should render an image with correct src attribute", () => {
    const wrapper = shallow(<AboutUsPage />);
    const img = wrapper.find("img");
    expect(img.prop("src")).toEqual("kitchen_staff.jpeg");
  });
});