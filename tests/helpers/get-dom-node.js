/**
 * A helper that gets the actual DOM node of a component rendered during
 * an integration or component unit test.
 * (Initially, the node will have a parent div wrapping it.)
 *
 * By getting direct access to the aforementioned node,
 * we can jump right into using the DOM API.
 */
export default function getDOMNode(context) {
  return context.$()[0].firstElementChild;
}
