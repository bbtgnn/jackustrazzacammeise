export function mod(n: number, m: number) {
  //
  if (n == 0 && m == 0) {
    return 0;
  }
  //
  else {
    return ((n % m) + m) % m;
  }
}
