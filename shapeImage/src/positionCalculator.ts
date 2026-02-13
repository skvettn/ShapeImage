export class Calculator {
  public static calculate(value: string, sc: number): number {
    const pos = parseFloat(value);
    // if scale is 0, we just want to position the image based on the original position
    const scaledPos = pos * 100; // = 30
    // if the scale is less than 1, we need to adjust the position based on the scale factor
    // for example, if the scale is 0.5, we need to move the image up by 50% of the original position to keep it centered
    // if the scale is greater than 1, we need to adjust the position in the opposite direction
    // for example, if the scale is 2, we need to move the image down by 100% of the original position to keep it centered

    return scaledPos * -1;
  }
}
