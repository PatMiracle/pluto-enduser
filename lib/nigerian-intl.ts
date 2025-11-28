export function toNigeriaIntlFormat(input: string) {
  {
    if (!input) return null;

    // Remove spaces, hyphens, parentheses
    let phone = input.replace(/[\s\-()]/g, "");

    // Strict NCC prefixes (first 4 digits after removing the leading 0)
    const strictPrefixes = [
      "0701",
      "0702",
      "0703",
      "0704",
      "0705",
      "0706",
      "0708",
      "0802",
      "0803",
      "0804",
      "0805",
      "0806",
      "0807",
      "0808",
      "0809",
      "0810",
      "0811",
      "0812",
      "0813",
      "0814",
      "0815",
      "0816",
      "0817",
      "0818",
      "0901",
      "0902",
      "0903",
      "0904",
      "0905",
      "0906",
      "0907",
      "0908",
      "0909",
      "0911",
      "0912",
      "0913",
      "0915",
      "0916",
    ];

    // 1. Already in +234XXXXXXXXXX format
    if (/^\+234\d{10}$/.test(phone)) {
      const prefix = "0" + phone.substring(4, 7);
      return strictPrefixes.includes(prefix) ? phone : null;
    }

    // 2. 234XXXXXXXXXX format
    if (/^234\d{10}$/.test(phone)) {
      const prefix = "0" + phone.substring(3, 6);
      return strictPrefixes.includes(prefix) ? "+" + phone : null;
    }

    // 3. Local format 0XXXXXXXXXX
    if (/^0\d{10}$/.test(phone)) {
      const prefix = phone.substring(0, 4); // after "0"
      if (!strictPrefixes.includes(prefix)) return null;
      return "+234" + phone.substring(1);
    }

    // 4. Missing first 0
    if (/^\d{10}$/.test(phone)) {
      const prefix = "0" + phone.substring(0, 3);
      if (!strictPrefixes.includes(prefix)) return null;
      return "+234" + phone;
    }

    return null; // invalid format
  }
}
