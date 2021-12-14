export function sleep(millis: any) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}
