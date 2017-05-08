import {Injectable} from "@angular/core";
import {Uint32ArrayBigEndian} from "./Uint32ArrayBigEndian";
/**
 * Created by Nico on 25/10/2016.
 */
@Injectable()
export class Hasher {

  POW_2_24 = Math.pow(2, 24);

  POW_2_32 = Math.pow(2, 32);

  hex(n:number):string {
    var s = "",
      v:number;
    for (var i = 7; i >= 0; --i) {
      v = (n >>> (i << 2)) & 0xF;
      s += v.toString(16);
    }
    return s;
  }

  lrot(n:number, bits:number):number {
    return ((n << bits) | (n >>> (32 - bits)));
  }


  string2ArrayBuffer(s:string):ArrayBuffer {
    s = s.replace(/[\u0080-\u07ff]/g,
      function (c:string) {
        var code = c.charCodeAt(0);
        return String.fromCharCode(0xC0 | code >> 6, 0x80 | code & 0x3F);
      });
    s = s.replace(/[\u0080-\uffff]/g,
      function (c:string) {
        var code = c.charCodeAt(0);
        return String.fromCharCode(0xE0 | code >> 12, 0x80 | code >> 6 & 0x3F, 0x80 | code & 0x3F);
      });
    var n = s.length,
      array = new Uint8Array(n);
    for (var i = 0; i < n; ++i) {
      array[i] = s.charCodeAt(i);
    }
    return array.buffer;
  }

  hash(bufferOrString: any): string {

    var source: ArrayBuffer;
    if (bufferOrString instanceof ArrayBuffer)
    {
      source = <ArrayBuffer> bufferOrString;
    }
    else
    {
      source = this.string2ArrayBuffer(String(bufferOrString));
    }

    var h0 = 0x67452301,
      h1 = 0xEFCDAB89,
      h2 = 0x98BADCFE,
      h3 = 0x10325476,
      h4 = 0xC3D2E1F0,
      i: number,
      sbytes = source.byteLength,
      sbits = sbytes << 3,
      minbits = sbits + 65,
      bits = Math.ceil(minbits / 512) << 9,
      bytes = bits >>> 3,
      slen = bytes >>> 2,
      s = new Uint32ArrayBigEndian(slen),
      s8 = s.bytes,
      j: number,
      w = new Uint32Array(80),
      sourceArray = new Uint8Array(source);
    for (i = 0; i < sbytes; ++i)
    {
      s8[i] = sourceArray[i];
    }
    s8[sbytes] = 0x80;
    s.set(slen - 2, Math.floor(sbits / this.POW_2_32));
    s.set(slen - 1, sbits & 0xFFFFFFFF);
    for (i = 0; i < slen; i += 16)
    {
      for (j = 0; j < 16; ++j)
      {
        w[j] = s.get(i + j);
      }
      for ( ; j < 80; ++j)
      {
        w[j] = this.lrot(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
      }
      var a = h0,
        b = h1,
        c = h2,
        d = h3,
        e = h4,
        f: number,
        k: number,
        temp: number;
      for (j = 0; j < 80; ++j)
      {
        if (j < 20)
        {
          f = (b & c) | ((~b) & d);
          k = 0x5A827999;
        }
        else if (j < 40)
        {
          f = b ^ c ^ d;
          k = 0x6ED9EBA1;
        }
        else if (j < 60)
        {
          f = (b & c) ^ (b & d) ^ (c & d);
          k = 0x8F1BBCDC;
        }
        else
        {
          f = b ^ c ^ d;
          k = 0xCA62C1D6;
        }

        temp = (this.lrot(a, 5) + f + e + k + w[j]) & 0xFFFFFFFF;
        e = d;
        d = c;
        c = this.lrot(b, 30);
        b = a;
        a = temp;
      }
      h0 = (h0 + a) & 0xFFFFFFFF;
      h1 = (h1 + b) & 0xFFFFFFFF;
      h2 = (h2 + c) & 0xFFFFFFFF;
      h3 = (h3 + d) & 0xFFFFFFFF;
      h4 = (h4 + e) & 0xFFFFFFFF;
    }
    return this.hex(h0) + this.hex(h1) + this.hex(h2) + this.hex(h3) + this.hex(h4);
  }

}

