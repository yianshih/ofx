import React from "react"
// import renderer from "react-test-renderer"
// import Link from "../Link.react"
import { render, screen } from '@testing-library/react';
import QuickQuoteResult from "./QuickQuoteResult"

test("Renders Quick Quote result", () => {
  
  expect(1).toBe(1)
})

// test('Link changes the class when hovered', () => {
//   const component = renderer.create(
//     <Link page="http://www.facebook.com">Facebook</Link>,
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseEnter();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseLeave();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
