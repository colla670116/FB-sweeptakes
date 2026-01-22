!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pako={})}(this,(function(t){"use strict";function e(t){let e=t.length;for(;--e>=0;)t[e]=0}const a=256,n=286,r=30,i=15,s=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),_=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),l=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),h=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),o=new Array(576);e(o);const d=new Array(60);e(d);const u=new Array(512);e(u);const f=new Array(256);e(f);const c=new Array(29);e(c);const p=new Array(r);function g(t,e,a,n,r){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=n,this.max_length=r,this.has_stree=t&&t.length}let w,b,m;function v(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(p);const y=t=>t<256?u[t]:u[256+(t>>>7)],z=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},k=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,z(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},x=(t,e,a)=>{k(t,a[2*e],a[2*e+1])},A=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},E=(t,e,a)=>{const n=new Array(16);let r,s,_=0;for(r=1;r<=i;r++)n[r]=_=_+a[r-1]<<1;for(s=0;s<=e;s++){let e=t[2*s+1];0!==e&&(t[2*s]=A(n[e]++,e))}},Z=t=>{let e;for(e=0;e<n;e++)t.dyn_ltree[2*e]=0;for(e=0;e<r;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0},R=t=>{t.bi_valid>8?z(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},U=(t,e,a,n)=>{const r=2*e,i=2*a;return t[r]<t[i]||t[r]===t[i]&&n[e]<=n[a]},S=(t,e,a)=>{const n=t.heap[a];let r=a<<1;for(;r<=t.heap_len&&(r<t.heap_len&&U(e,t.heap[r+1],t.heap[r],t.depth)&&r++,!U(e,n,t.heap[r],t.depth));)t.heap[a]=t.heap[r],a=r,r<<=1;t.heap[a]=n},T=(t,e,n)=>{let r,i,l,h,o=0;if(0!==t.last_lit)do{r=t.pending_buf[t.d_buf+2*o]<<8|t.pending_buf[t.d_buf+2*o+1],i=t.pending_buf[t.l_buf+o],o++,0===r?x(t,i,e):(l=f[i],x(t,l+a+1,e),h=s[l],0!==h&&(i-=c[l],k(t,i,h)),r--,l=y(r),x(t,l,n),h=_[l],0!==h&&(r-=p[l],k(t,r,h)))}while(o<t.last_lit);x(t,256,e)},L=(t,e)=>{const a=e.dyn_tree,n=e.stat_desc.static_tree,r=e.stat_desc.has_stree,s=e.stat_desc.elems;let _,l,h,o=-1;for(t.heap_len=0,t.heap_max=573,_=0;_<s;_++)0!==a[2*_]?(t.heap[++t.heap_len]=o=_,t.depth[_]=0):a[2*_+1]=0;for(;t.heap_len<2;)h=t.heap[++t.heap_len]=o<2?++o:0,a[2*h]=1,t.depth[h]=0,t.opt_len--,r&&(t.static_len-=n[2*h+1]);for(e.max_code=o,_=t.heap_len>>1;_>=1;_--)S(t,a,_);h=s;do{_=t.heap[1],t.heap[1]=t.heap[t.heap_len--],S(t,a,1),l=t.heap[1],t.heap[--t.heap_max]=_,t.heap[--t.heap_max]=l,a[2*h]=a[2*_]+a[2*l],t.depth[h]=(t.depth[_]>=t.depth[l]?t.depth[_]:t.depth[l])+1,a[2*_+1]=a[2*l+1]=h,t.heap[1]=h++,S(t,a,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,n=e.max_code,r=e.stat_desc.static_tree,s=e.stat_desc.has_stree,_=e.stat_desc.extra_bits,l=e.stat_desc.extra_base,h=e.stat_desc.max_length;let o,d,u,f,c,p,g=0;for(f=0;f<=i;f++)t.bl_count[f]=0;for(a[2*t.heap[t.heap_max]+1]=0,o=t.heap_max+1;o<573;o++)d=t.heap[o],f=a[2*a[2*d+1]+1]+1,f>h&&(f=h,g++),a[2*d+1]=f,d>n||(t.bl_count[f]++,c=0,d>=l&&(c=_[d-l]),p=a[2*d],t.opt_len+=p*(f+c),s&&(t.static_len+=p*(r[2*d+1]+c)));if(0!==g){do{for(f=h-1;0===t.bl_count[f];)f--;t.bl_count[f]--,t.bl_count[f+1]+=2,t.bl_count[h]--,g-=2}while(g>0);for(f=h;0!==f;f--)for(d=t.bl_count[f];0!==d;)u=t.heap[--o],u>n||(a[2*u+1]!==f&&(t.opt_len+=(f-a[2*u+1])*a[2*u],a[2*u+1]=f),d--)}})(t,e),E(a,o,t.bl_count)},F=(t,e,a)=>{let n,r,i=-1,s=e[1],_=0,l=7,h=4;for(0===s&&(l=138,h=3),e[2*(a+1)+1]=65535,n=0;n<=a;n++)r=s,s=e[2*(n+1)+1],++_<l&&r===s||(_<h?t.bl_tree[2*r]+=_:0!==r?(r!==i&&t.bl_tree[2*r]++,t.bl_tree[32]++):_<=10?t.bl_tree[34]++:t.bl_tree[36]++,_=0,i=r,0===s?(l=138,h=3):r===s?(l=6,h=3):(l=7,h=4))},O=(t,e,a)=>{let n,r,i=-1,s=e[1],_=0,l=7,h=4;for(0===s&&(l=138,h=3),n=0;n<=a;n++)if(r=s,s=e[2*(n+1)+1],!(++_<l&&r===s)){if(_<h)do{x(t,r,t.bl_tree)}while(0!=--_);else 0!==r?(r!==i&&(x(t,r,t.bl_tree),_--),x(t,16,t.bl_tree),k(t,_-3,2)):_<=10?(x(t,17,t.bl_tree),k(t,_-3,3)):(x(t,18,t.bl_tree),k(t,_-11,7));_=0,i=r,0===s?(l=138,h=3):r===s?(l=6,h=3):(l=7,h=4)}};let D=!1;const N=(t,e,a,n)=>{k(t,0+(n?1:0),3),((t,e,a,n)=>{R(t),n&&(z(t,a),z(t,~a)),t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a})(t,e,a,!0)};var I={_tr_init:t=>{D||((()=>{let t,e,a,h,v;const y=new Array(16);for(a=0,h=0;h<28;h++)for(c[h]=a,t=0;t<1<<s[h];t++)f[a++]=h;for(f[a-1]=h,v=0,h=0;h<16;h++)for(p[h]=v,t=0;t<1<<_[h];t++)u[v++]=h;for(v>>=7;h<r;h++)for(p[h]=v<<7,t=0;t<1<<_[h]-7;t++)u[256+v++]=h;for(e=0;e<=i;e++)y[e]=0;for(t=0;t<=143;)o[2*t+1]=8,t++,y[8]++;for(;t<=255;)o[2*t+1]=9,t++,y[9]++;for(;t<=279;)o[2*t+1]=7,t++,y[7]++;for(;t<=287;)o[2*t+1]=8,t++,y[8]++;for(E(o,287,y),t=0;t<r;t++)d[2*t+1]=5,d[2*t]=A(t,5);w=new g(o,s,257,n,i),b=new g(d,_,0,r,i),m=new g(new Array(0),l,0,19,7)})(),D=!0),t.l_desc=new v(t.dyn_ltree,w),t.d_desc=new v(t.dyn_dtree,b),t.bl_desc=new v(t.bl_tree,m),t.bi_buf=0,t.bi_valid=0,Z(t)},_tr_stored_block:N,_tr_flush_block:(t,e,n,r)=>{let i,s,_=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,n=4093624447;for(e=0;e<=31;e++,n>>>=1)if(1&n&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<a;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),L(t,t.l_desc),L(t,t.d_desc),_=(t=>{let e;for(F(t,t.dyn_ltree,t.l_desc.max_code),F(t,t.dyn_dtree,t.d_desc.max_code),L(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*h[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),i=t.opt_len+3+7>>>3,s=t.static_len+3+7>>>3,s<=i&&(i=s)):i=s=n+5,n+4<=i&&-1!==e?N(t,e,n,r):4===t.strategy||s===i?(k(t,2+(r?1:0),3),T(t,o,d)):(k(t,4+(r?1:0),3),((t,e,a,n)=>{let r;for(k(t,e-257,5),k(t,a-1,5),k(t,n-4,4),r=0;r<n;r++)k(t,t.bl_tree[2*h[r]+1],3);O(t,t.dyn_ltree,e-1),O(t,t.dyn_dtree,a-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,_+1),T(t,t.dyn_ltree,t.dyn_dtree)),Z(t),r&&R(t)},_tr_tally:(t,e,n)=>(t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&n,t.last_lit++,0===e?t.dyn_ltree[2*n]++:(t.matches++,e--,t.dyn_ltree[2*(f[n]+a+1)]++,t.dyn_dtree[2*y(e)]++),t.last_lit===t.lit_bufsize-1),_tr_align:t=>{k(t,2,3),x(t,256,o),(t=>{16===t.bi_valid?(z(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var C=(t,e,a,n)=>{let r=65535&t|0,i=t>>>16&65535|0,s=0;for(;0!==a;){s=a>2e3?2e3:a,a-=s;do{r=r+e[n++]|0,i=i+r|0}while(--s);r%=65521,i%=65521}return r|i<<16|0};const B=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var n=0;n<8;n++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e})());var H=(t,e,a,n)=>{const r=B,i=n+a;t^=-1;for(let a=n;a<i;a++)t=t>>>8^r[255&(t^e[a])];return-1^t},M={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},P={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:j,_tr_stored_block:K,_tr_flush_block:Y,_tr_tally:G,_tr_align:X}=I,{Z_NO_FLUSH:W,Z_PARTIAL_FLUSH:q,Z_FULL_FLUSH:J,Z_FINISH:Q,Z_BLOCK:V,Z_OK:$,Z_STREAM_END:tt,Z_STREAM_ERROR:et,Z_DATA_ERROR:at,Z_BUF_ERROR:nt,Z_DEFAULT_COMPRESSION:rt,Z_FILTERED:it,Z_HUFFMAN_ONLY:st,Z_RLE:_t,Z_FIXED:lt,Z_DEFAULT_STRATEGY:ht,Z_UNKNOWN:ot,Z_DEFLATED:dt}=P,ut=258,ft=262,ct=103,pt=113,gt=666,wt=(t,e)=>(t.msg=M[e],e),bt=t=>(t<<1)-(t>4?9:0),mt=t=>{let e=t.length;for(;--e>=0;)t[e]=0};let vt=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const yt=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},zt=(t,e)=>{Y(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,yt(t.strm)},kt=(t,e)=>{t.pending_buf[t.pending++]=e},xt=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},At=(t,e,a,n)=>{let r=t.avail_in;return r>n&&(r=n),0===r?0:(t.avail_in-=r,e.set(t.input.subarray(t.next_in,t.next_in+r),a),1===t.state.wrap?t.adler=C(t.adler,e,r,a):2===t.state.wrap&&(t.adler=H(t.adler,e,r,a)),t.next_in+=r,t.total_in+=r,r)},Et=(t,e)=>{let a,n,r=t.max_chain_length,i=t.strstart,s=t.prev_length,_=t.nice_match;const l=t.strstart>t.w_size-ft?t.strstart-(t.w_size-ft):0,h=t.window,o=t.w_mask,d=t.prev,u=t.strstart+ut;let f=h[i+s-1],c=h[i+s];t.prev_length>=t.good_match&&(r>>=2),_>t.lookahead&&(_=t.lookahead);do{if(a=e,h[a+s]===c&&h[a+s-1]===f&&h[a]===h[i]&&h[++a]===h[i+1]){i+=2,a++;do{}while(h[++i]===h[++a]&&h[++i]===h[++a]&&h[++i]===h[++a]&&h[++i]===h[++a]&&h[++i]===h[++a]&&h[++i]===h[++a]&&h[++i]===h[++a]&&h[++i]===h[++a]&&i<u);if(n=ut-(u-i),i=u-ut,n>s){if(t.match_start=e,s=n,n>=_)break;f=h[i+s-1],c=h[i+s]}}}while((e=d[e&o])>l&&0!=--r);return s<=t.lookahead?s:t.lookahead},Zt=t=>{const e=t.w_size;let a,n,r,i,s;do{if(i=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-ft)){t.window.set(t.window.subarray(e,e+e),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,n=t.hash_size,a=n;do{r=t.head[--a],t.head[a]=r>=e?r-e:0}while(--n);n=e,a=n;do{r=t.prev[--a],t.prev[a]=r>=e?r-e:0}while(--n);i+=e}if(0===t.strm.avail_in)break;if(n=At(t.strm,t.window,t.strstart+t.lookahead,i),t.lookahead+=n,t.lookahead+t.insert>=3)for(s=t.strstart-t.insert,t.ins_h=t.window[s],t.ins_h=vt(t,t.ins_h,t.window[s+1]);t.insert&&(t.ins_h=vt(t,t.ins_h,t.window[s+3-1]),t.prev[s&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=s,s++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<ft&&0!==t.strm.avail_in)},Rt=(t,e)=>{let a,n;for(;;){if(t.lookahead<ft){if(Zt(t),t.lookahead<ft&&e===W)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=vt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-ft&&(t.match_length=Et(t,a)),t.match_length>=3)if(n=G(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=vt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=vt(t,t.ins_h,t.window[t.strstart+1]);else n=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(n&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===Q?(zt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(zt(t,!1),0===t.strm.avail_out)?1:2},Ut=(t,e)=>{let a,n,r;for(;;){if(t.lookahead<ft){if(Zt(t),t.lookahead<ft&&e===W)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=vt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-ft&&(t.match_length=Et(t,a),t.match_length<=5&&(t.strategy===it||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){r=t.strstart+t.lookahead-3,n=G(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=r&&(t.ins_h=vt(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,n&&(zt(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(n=G(t,0,t.window[t.strstart-1]),n&&zt(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(n=G(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===Q?(zt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(zt(t,!1),0===t.strm.avail_out)?1:2};function St(t,e,a,n,r){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=n,this.func=r}const Tt=[new St(0,0,0,0,((t,e)=>{let a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(Zt(t),0===t.lookahead&&e===W)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;const n=t.block_start+a;if((0===t.strstart||t.strstart>=n)&&(t.lookahead=t.strstart-n,t.strstart=n,zt(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-ft&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(zt(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(zt(t,!1),t.strm.avail_out),1)})),new St(4,4,8,4,Rt),new St(4,5,16,8,Rt),new St(4,6,32,32,Rt),new St(4,4,16,16,Ut),new St(8,16,32,32,Ut),new St(8,16,128,128,Ut),new St(8,32,128,256,Ut),new St(32,128,258,1024,Ut),new St(32,258,258,4096,Ut)];function Lt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=dt,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),mt(this.dyn_ltree),mt(this.dyn_dtree),mt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),mt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),mt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Ft=t=>{if(!t||!t.state)return wt(t,et);t.total_in=t.total_out=0,t.data_type=ot;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:pt,t.adler=2===e.wrap?0:1,e.last_flush=W,j(e),$},Ot=t=>{const e=Ft(t);var a;return e===$&&((a=t.state).window_size=2*a.w_size,mt(a.head),a.max_lazy_match=Tt[a.level].max_lazy,a.good_match=Tt[a.level].good_length,a.nice_match=Tt[a.level].nice_length,a.max_chain_length=Tt[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Dt=(t,e,a,n,r,i)=>{if(!t)return et;let s=1;if(e===rt&&(e=6),n<0?(s=0,n=-n):n>15&&(s=2,n-=16),r<1||r>9||a!==dt||n<8||n>15||e<0||e>9||i<0||i>lt)return wt(t,et);8===n&&(n=9);const _=new Lt;return t.state=_,_.strm=t,_.wrap=s,_.gzhead=null,_.w_bits=n,_.w_size=1<<_.w_bits,_.w_mask=_.w_size-1,_.hash_bits=r+7,_.hash_size=1<<_.hash_bits,_.hash_mask=_.hash_size-1,_.hash_shift=~~((_.hash_bits+3-1)/3),_.window=new Uint8Array(2*_.w_size),_.head=new Uint16Array(_.hash_size),_.prev=new Uint16Array(_.w_size),_.lit_bufsize=1<<r+6,_.pending_buf_size=4*_.lit_bufsize,_.pending_buf=new Uint8Array(_.pending_buf_size),_.d_buf=1*_.lit_bufsize,_.l_buf=3*_.lit_bufsize,_.level=e,_.strategy=i,_.method=a,Ot(t)};var Nt={deflateInit:(t,e)=>Dt(t,e,dt,15,8,ht),deflateInit2:Dt,deflateReset:Ot,deflateResetKeep:Ft,deflateSetHeader:(t,e)=>t&&t.state?2!==t.state.wrap?et:(t.state.gzhead=e,$):et,deflate:(t,e)=>{let a,n;if(!t||!t.state||e>V||e<0)return t?wt(t,et):et;const r=t.state;if(!t.output||!t.input&&0!==t.avail_in||r.status===gt&&e!==Q)return wt(t,0===t.avail_out?nt:et);r.strm=t;const i=r.last_flush;if(r.last_flush=e,42===r.status)if(2===r.wrap)t.adler=0,kt(r,31),kt(r,139),kt(r,8),r.gzhead?(kt(r,(r.gzhead.text?1:0)+(r.gzhead.hcrc?2:0)+(r.gzhead.extra?4:0)+(r.gzhead.name?8:0)+(r.gzhead.comment?16:0)),kt(r,255&r.gzhead.time),kt(r,r.gzhead.time>>8&255),kt(r,r.gzhead.time>>16&255),kt(r,r.gzhead.time>>24&255),kt(r,9===r.level?2:r.strategy>=st||r.level<2?4:0),kt(r,255&r.gzhead.os),r.gzhead.extra&&r.gzhead.extra.length&&(kt(r,255&r.gzhead.extra.length),kt(r,r.gzhead.extra.length>>8&255)),r.gzhead.hcrc&&(t.adler=H(t.adler,r.pending_buf,r.pending,0)),r.gzindex=0,r.status=69):(kt(r,0),kt(r,0),kt(r,0),kt(r,0),kt(r,0),kt(r,9===r.level?2:r.strategy>=st||r.level<2?4:0),kt(r,3),r.status=pt);else{let e=dt+(r.w_bits-8<<4)<<8,a=-1;a=r.strategy>=st||r.level<2?0:r.level<6?1:6===r.level?2:3,e|=a<<6,0!==r.strstart&&(e|=32),e+=31-e%31,r.status=pt,xt(r,e),0!==r.strstart&&(xt(r,t.adler>>>16),xt(r,65535&t.adler)),t.adler=1}if(69===r.status)if(r.gzhead.extra){for(a=r.pending;r.gzindex<(65535&r.gzhead.extra.length)&&(r.pending!==r.pending_buf_size||(r.gzhead.hcrc&&r.pending>a&&(t.adler=H(t.adler,r.pending_buf,r.pending-a,a)),yt(t),a=r.pending,r.pending!==r.pending_buf_size));)kt(r,255&r.gzhead.extra[r.gzindex]),r.gzindex++;r.gzhead.hcrc&&r.pending>a&&(t.adler=H(t.adler,r.pending_buf,r.pending-a,a)),r.gzindex===r.gzhead.extra.length&&(r.gzindex=0,r.status=73)}else r.status=73;if(73===r.status)if(r.gzhead.name){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=H(t.adler,r.pending_buf,r.pending-a,a)),yt(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.name.length?255&r.gzhead.name.charCodeAt(r.gzindex++):0,kt(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=H(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.gzindex=0,r.status=91)}else r.status=91;if(91===r.status)if(r.gzhead.comment){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=H(t.adler,r.pending_buf,r.pending-a,a)),yt(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.comment.length?255&r.gzhead.comment.charCodeAt(r.gzindex++):0,kt(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=H(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.status=ct)}else r.status=ct;if(r.status===ct&&(r.gzhead.hcrc?(r.pending+2>r.pending_buf_size&&yt(t),r.pending+2<=r.pending_buf_size&&(kt(r,255&t.adler),kt(r,t.adler>>8&255),t.adler=0,r.status=pt)):r.status=pt),0!==r.pending){if(yt(t),0===t.avail_out)return r.last_flush=-1,$}else if(0===t.avail_in&&bt(e)<=bt(i)&&e!==Q)return wt(t,nt);if(r.status===gt&&0!==t.avail_in)return wt(t,nt);if(0!==t.avail_in||0!==r.lookahead||e!==W&&r.status!==gt){let a=r.strategy===st?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(Zt(t),0===t.lookahead)){if(e===W)return 1;break}if(t.match_length=0,a=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(zt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(zt(t,!1),0===t.strm.avail_out)?1:2})(r,e):r.strategy===_t?((t,e)=>{let a,n,r,i;const s=t.window;for(;;){if(t.lookahead<=ut){if(Zt(t),t.lookahead<=ut&&e===W)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(r=t.strstart-1,n=s[r],n===s[++r]&&n===s[++r]&&n===s[++r])){i=t.strstart+ut;do{}while(n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&r<i);t.match_length=ut-(i-r),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=G(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=G(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(zt(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===Q?(zt(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(zt(t,!1),0===t.strm.avail_out)?1:2})(r,e):Tt[r.level].func(r,e);if(3!==a&&4!==a||(r.status=gt),1===a||3===a)return 0===t.avail_out&&(r.last_flush=-1),$;if(2===a&&(e===q?X(r):e!==V&&(K(r,0,0,!1),e===J&&(mt(r.head),0===r.lookahead&&(r.strstart=0,r.block_start=0,r.insert=0))),yt(t),0===t.avail_out))return r.last_flush=-1,$}return e!==Q?$:r.wrap<=0?tt:(2===r.wrap?(kt(r,255&t.adler),kt(r,t.adler>>8&255),kt(r,t.adler>>16&255),kt(r,t.adler>>24&255),kt(r,255&t.total_in),kt(r,t.total_in>>8&255),kt(r,t.total_in>>16&255),kt(r,t.total_in>>24&255)):(xt(r,t.adler>>>16),xt(r,65535&t.adler)),yt(t),r.wrap>0&&(r.wrap=-r.wrap),0!==r.pending?$:tt)},deflateEnd:t=>{if(!t||!t.state)return et;const e=t.state.status;return 42!==e&&69!==e&&73!==e&&91!==e&&e!==ct&&e!==pt&&e!==gt?wt(t,et):(t.state=null,e===pt?wt(t,at):$)},deflateSetDictionary:(t,e)=>{let a=e.length;if(!t||!t.state)return et;const n=t.state,r=n.wrap;if(2===r||1===r&&42!==n.status||n.lookahead)return et;if(1===r&&(t.adler=C(t.adler,e,a,0)),n.wrap=0,a>=n.w_size){0===r&&(mt(n.head),n.strstart=0,n.block_start=0,n.insert=0);let t=new Uint8Array(n.w_size);t.set(e.subarray(a-n.w_size,a),0),e=t,a=n.w_size}const i=t.avail_in,s=t.next_in,_=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,Zt(n);n.lookahead>=3;){let t=n.strstart,e=n.lookahead-2;do{n.ins_h=vt(n,n.ins_h,n.window[t+3-1]),n.prev[t&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=t,t++}while(--e);n.strstart=t,n.lookahead=2,Zt(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=2,n.match_available=0,t.next_in=s,t.input=_,t.avail_in=i,n.wrap=r,$},deflateInfo:"pako deflate (from Nodeca project)"};const It=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var Ct=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)It(a,e)&&(t[e]=a[e])}}return t},Bt=t=>{let e=0;for(let a=0,n=t.length;a<n;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,n=0,r=t.length;e<r;e++){let r=t[e];a.set(r,n),n+=r.length}return a};let Ht=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Ht=!1}const Mt=new Uint8Array(256);for(let t=0;t<256;t++)Mt[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Mt[254]=Mt[254]=1;var Pt=t=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,n,r,i,s=t.length,_=0;for(r=0;r<s;r++)a=t.charCodeAt(r),55296==(64512&a)&&r+1<s&&(n=t.charCodeAt(r+1),56320==(64512&n)&&(a=65536+(a-55296<<10)+(n-56320),r++)),_+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(_),i=0,r=0;i<_;r++)a=t.charCodeAt(r),55296==(64512&a)&&r+1<s&&(n=t.charCodeAt(r+1),56320==(64512&n)&&(a=65536+(a-55296<<10)+(n-56320),r++)),a<128?e[i++]=a:a<2048?(e[i++]=192|a>>>6,e[i++]=128|63&a):a<65536?(e[i++]=224|a>>>12,e[i++]=128|a>>>6&63,e[i++]=128|63&a):(e[i++]=240|a>>>18,e[i++]=128|a>>>12&63,e[i++]=128|a>>>6&63,e[i++]=128|63&a);return e};var jt=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Kt=Object.prototype.toString,{Z_NO_FLUSH:Yt,Z_SYNC_FLUSH:Gt,Z_FULL_FLUSH:Xt,Z_FINISH:Wt,Z_OK:qt,Z_STREAM_END:Jt,Z_DEFAULT_COMPRESSION:Qt,Z_DEFAULT_STRATEGY:Vt,Z_DEFLATED:$t}=P;function te(t){this.options=Ct({level:Qt,method:$t,chunkSize:16384,windowBits:15,memLevel:8,strategy:Vt},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new jt,this.strm.avail_out=0;let a=Nt.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==qt)throw new Error(M[a]);if(e.header&&Nt.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?Pt(e.dictionary):"[object ArrayBuffer]"===Kt.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=Nt.deflateSetDictionary(this.strm,t),a!==qt)throw new Error(M[a]);this._dict_set=!0}}function ee(t,e){const a=new te(e);if(a.push(t,!0),a.err)throw a.msg||M[a.err];return a.result}te.prototype.push=function(t,e){const a=this.strm,n=this.options.chunkSize;let r,i;if(this.ended)return!1;for(i=e===~~e?e:!0===e?Wt:Yt,"string"==typeof t?a.input=Pt(t):"[object ArrayBuffer]"===Kt.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(n),a.next_out=0,a.avail_out=n),(i===Gt||i===Xt)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else{if(r=Nt.deflate(a,i),r===Jt)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),r=Nt.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===qt;if(0!==a.avail_out){if(i>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output)}return!0},te.prototype.onData=function(t){this.chunks.push(t)},te.prototype.onEnd=function(t){t===qt&&(this.result=Bt(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var ae=te,ne=ee,re=function(t,e){return(e=e||{}).raw=!0,ee(t,e)},ie=function(t,e){return(e=e||{}).gzip=!0,ee(t,e)},se=P,_e={Deflate:ae,deflate:ne,deflateRaw:re,gzip:ie,constants:se};t.Deflate=ae,t.constants=se,t.default=_e,t.deflate=ne,t.deflateRaw=re,t.gzip=ie,Object.defineProperty(t,"__esModule",{value:!0})}));

!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.JSEncrypt=e():t.JSEncrypt=e()}(window,(()=>(()=>{"use strict";var t={d:(e,i)=>{for(var r in i)t.o(i,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:i[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};function i(t){return"0123456789abcdefghijklmnopqrstuvwxyz".charAt(t)}function r(t,e){return t&e}function n(t,e){return t|e}function s(t,e){return t^e}function o(t,e){return t&~e}function h(t){if(0==t)return-1;var e=0;return 0==(65535&t)&&(t>>=16,e+=16),0==(255&t)&&(t>>=8,e+=8),0==(15&t)&&(t>>=4,e+=4),0==(3&t)&&(t>>=2,e+=2),0==(1&t)&&++e,e}function a(t){for(var e=0;0!=t;)t&=t-1,++e;return e}t.d(e,{default:()=>rt});var u,c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function f(t){var e,i,r="";for(e=0;e+3<=t.length;e+=3)i=parseInt(t.substring(e,e+3),16),r+=c.charAt(i>>6)+c.charAt(63&i);for(e+1==t.length?(i=parseInt(t.substring(e,e+1),16),r+=c.charAt(i<<2)):e+2==t.length&&(i=parseInt(t.substring(e,e+2),16),r+=c.charAt(i>>2)+c.charAt((3&i)<<4));(3&r.length)>0;)r+="=";return r}function l(t){var e,r="",n=0,s=0;for(e=0;e<t.length&&"="!=t.charAt(e);++e){var o=c.indexOf(t.charAt(e));o<0||(0==n?(r+=i(o>>2),s=3&o,n=1):1==n?(r+=i(s<<2|o>>4),s=15&o,n=2):2==n?(r+=i(s),r+=i(o>>2),s=3&o,n=3):(r+=i(s<<2|o>>4),r+=i(15&o),n=0))}return 1==n&&(r+=i(s<<2)),r}var p,g={decode:function(t){var e;if(void 0===p){var i="= \f\n\r\t \u2028\u2029";for(p=Object.create(null),e=0;e<64;++e)p["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)]=e;for(p["-"]=62,p._=63,e=0;e<i.length;++e)p[i.charAt(e)]=-1}var r=[],n=0,s=0;for(e=0;e<t.length;++e){var o=t.charAt(e);if("="==o)break;if(-1!=(o=p[o])){if(void 0===o)throw new Error("Illegal character at offset "+e);n|=o,++s>=4?(r[r.length]=n>>16,r[r.length]=n>>8&255,r[r.length]=255&n,n=0,s=0):n<<=6}}switch(s){case 1:throw new Error("Base64 encoding incomplete: at least 2 bits missing");case 2:r[r.length]=n>>10;break;case 3:r[r.length]=n>>16,r[r.length]=n>>8&255}return r},re:/-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,unarmor:function(t){var e=g.re.exec(t);if(e)if(e[1])t=e[1];else{if(!e[2])throw new Error("RegExp out of sync");t=e[2]}return g.decode(t)}},d=1e13,v=function(){function t(t){this.buf=[+t||0]}return t.prototype.mulAdd=function(t,e){var i,r,n=this.buf,s=n.length;for(i=0;i<s;++i)(r=n[i]*t+e)<d?e=0:r-=(e=0|r/d)*d,n[i]=r;e>0&&(n[i]=e)},t.prototype.sub=function(t){var e,i,r=this.buf,n=r.length;for(e=0;e<n;++e)(i=r[e]-t)<0?(i+=d,t=1):t=0,r[e]=i;for(;0===r[r.length-1];)r.pop()},t.prototype.toString=function(t){if(10!=(t||10))throw new Error("only base 10 is supported");for(var e=this.buf,i=e[e.length-1].toString(),r=e.length-2;r>=0;--r)i+=(d+e[r]).toString().substring(1);return i},t.prototype.valueOf=function(){for(var t=this.buf,e=0,i=t.length-1;i>=0;--i)e=e*d+t[i];return e},t.prototype.simplify=function(){var t=this.buf;return 1==t.length?t[0]:this},t}(),m=/^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,y=/^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;function b(t,e){return t.length>e&&(t=t.substring(0,e)+"…"),t}var T,S=function(){function t(e,i){this.hexDigits="0123456789ABCDEF",e instanceof t?(this.enc=e.enc,this.pos=e.pos):(this.enc=e,this.pos=i)}return t.prototype.get=function(t){if(void 0===t&&(t=this.pos++),t>=this.enc.length)throw new Error("Requesting byte offset ".concat(t," on a stream of length ").concat(this.enc.length));return"string"==typeof this.enc?this.enc.charCodeAt(t):this.enc[t]},t.prototype.hexByte=function(t){return this.hexDigits.charAt(t>>4&15)+this.hexDigits.charAt(15&t)},t.prototype.hexDump=function(t,e,i){for(var r="",n=t;n<e;++n)if(r+=this.hexByte(this.get(n)),!0!==i)switch(15&n){case 7:r+="  ";break;case 15:r+="\n";break;default:r+=" "}return r},t.prototype.isASCII=function(t,e){for(var i=t;i<e;++i){var r=this.get(i);if(r<32||r>176)return!1}return!0},t.prototype.parseStringISO=function(t,e){for(var i="",r=t;r<e;++r)i+=String.fromCharCode(this.get(r));return i},t.prototype.parseStringUTF=function(t,e){for(var i="",r=t;r<e;){var n=this.get(r++);i+=n<128?String.fromCharCode(n):n>191&&n<224?String.fromCharCode((31&n)<<6|63&this.get(r++)):String.fromCharCode((15&n)<<12|(63&this.get(r++))<<6|63&this.get(r++))}return i},t.prototype.parseStringBMP=function(t,e){for(var i,r,n="",s=t;s<e;)i=this.get(s++),r=this.get(s++),n+=String.fromCharCode(i<<8|r);return n},t.prototype.parseTime=function(t,e,i){var r=this.parseStringISO(t,e),n=(i?m:y).exec(r);return n?(i&&(n[1]=+n[1],n[1]+=+n[1]<70?2e3:1900),r=n[1]+"-"+n[2]+"-"+n[3]+" "+n[4],n[5]&&(r+=":"+n[5],n[6]&&(r+=":"+n[6],n[7]&&(r+="."+n[7]))),n[8]&&(r+=" UTC","Z"!=n[8]&&(r+=n[8],n[9]&&(r+=":"+n[9]))),r):"Unrecognized time: "+r},t.prototype.parseInteger=function(t,e){for(var i,r=this.get(t),n=r>127,s=n?255:0,o="";r==s&&++t<e;)r=this.get(t);if(0==(i=e-t))return n?-1:0;if(i>4){for(o=r,i<<=3;0==(128&(+o^s));)o=+o<<1,--i;o="("+i+" bit)\n"}n&&(r-=256);for(var h=new v(r),a=t+1;a<e;++a)h.mulAdd(256,this.get(a));return o+h.toString()},t.prototype.parseBitString=function(t,e,i){for(var r=this.get(t),n="("+((e-t-1<<3)-r)+" bit)\n",s="",o=t+1;o<e;++o){for(var h=this.get(o),a=o==e-1?r:0,u=7;u>=a;--u)s+=h>>u&1?"1":"0";if(s.length>i)return n+b(s,i)}return n+s},t.prototype.parseOctetString=function(t,e,i){if(this.isASCII(t,e))return b(this.parseStringISO(t,e),i);var r=e-t,n="("+r+" byte)\n";r>(i/=2)&&(e=t+i);for(var s=t;s<e;++s)n+=this.hexByte(this.get(s));return r>i&&(n+="…"),n},t.prototype.parseOID=function(t,e,i){for(var r="",n=new v,s=0,o=t;o<e;++o){var h=this.get(o);if(n.mulAdd(128,127&h),s+=7,!(128&h)){if(""===r)if((n=n.simplify())instanceof v)n.sub(80),r="2."+n.toString();else{var a=n<80?n<40?0:1:2;r=a+"."+(n-40*a)}else r+="."+n.toString();if(r.length>i)return b(r,i);n=new v,s=0}}return s>0&&(r+=".incomplete"),r},t}(),E=function(){function t(t,e,i,r,n){if(!(r instanceof w))throw new Error("Invalid tag value.");this.stream=t,this.header=e,this.length=i,this.tag=r,this.sub=n}return t.prototype.typeName=function(){switch(this.tag.tagClass){case 0:switch(this.tag.tagNumber){case 0:return"EOC";case 1:return"BOOLEAN";case 2:return"INTEGER";case 3:return"BIT_STRING";case 4:return"OCTET_STRING";case 5:return"NULL";case 6:return"OBJECT_IDENTIFIER";case 7:return"ObjectDescriptor";case 8:return"EXTERNAL";case 9:return"REAL";case 10:return"ENUMERATED";case 11:return"EMBEDDED_PDV";case 12:return"UTF8String";case 16:return"SEQUENCE";case 17:return"SET";case 18:return"NumericString";case 19:return"PrintableString";case 20:return"TeletexString";case 21:return"VideotexString";case 22:return"IA5String";case 23:return"UTCTime";case 24:return"GeneralizedTime";case 25:return"GraphicString";case 26:return"VisibleString";case 27:return"GeneralString";case 28:return"UniversalString";case 30:return"BMPString"}return"Universal_"+this.tag.tagNumber.toString();case 1:return"Application_"+this.tag.tagNumber.toString();case 2:return"["+this.tag.tagNumber.toString()+"]";case 3:return"Private_"+this.tag.tagNumber.toString()}},t.prototype.content=function(t){if(void 0===this.tag)return null;void 0===t&&(t=1/0);var e=this.posContent(),i=Math.abs(this.length);if(!this.tag.isUniversal())return null!==this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(e,e+i,t);switch(this.tag.tagNumber){case 1:return 0===this.stream.get(e)?"false":"true";case 2:return this.stream.parseInteger(e,e+i);case 3:return this.sub?"("+this.sub.length+" elem)":this.stream.parseBitString(e,e+i,t);case 4:return this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(e,e+i,t);case 6:return this.stream.parseOID(e,e+i,t);case 16:case 17:return null!==this.sub?"("+this.sub.length+" elem)":"(no elem)";case 12:return b(this.stream.parseStringUTF(e,e+i),t);case 18:case 19:case 20:case 21:case 22:case 26:return b(this.stream.parseStringISO(e,e+i),t);case 30:return b(this.stream.parseStringBMP(e,e+i),t);case 23:case 24:return this.stream.parseTime(e,e+i,23==this.tag.tagNumber)}return null},t.prototype.toString=function(){return this.typeName()+"@"+this.stream.pos+"[header:"+this.header+",length:"+this.length+",sub:"+(null===this.sub?"null":this.sub.length)+"]"},t.prototype.toPrettyString=function(t){void 0===t&&(t="");var e=t+this.typeName()+" @"+this.stream.pos;if(this.length>=0&&(e+="+"),e+=this.length,this.tag.tagConstructed?e+=" (constructed)":!this.tag.isUniversal()||3!=this.tag.tagNumber&&4!=this.tag.tagNumber||null===this.sub||(e+=" (encapsulates)"),e+="\n",null!==this.sub){t+="  ";for(var i=0,r=this.sub.length;i<r;++i)e+=this.sub[i].toPrettyString(t)}return e},t.prototype.posStart=function(){return this.stream.pos},t.prototype.posContent=function(){return this.stream.pos+this.header},t.prototype.posEnd=function(){return this.stream.pos+this.header+Math.abs(this.length)},t.prototype.toHexString=function(){return this.stream.hexDump(this.posStart(),this.posEnd(),!0)},t.decodeLength=function(t){var e=t.get(),i=127&e;if(i==e)return i;if(i>6)throw new Error("Length over 48 bits not supported at position "+(t.pos-1));if(0===i)return null;e=0;for(var r=0;r<i;++r)e=256*e+t.get();return e},t.prototype.getHexStringValue=function(){var t=this.toHexString(),e=2*this.header,i=2*this.length;return t.substr(e,i)},t.decode=function(e){var i;i=e instanceof S?e:new S(e,0);var r=new S(i),n=new w(i),s=t.decodeLength(i),o=i.pos,h=o-r.pos,a=null,u=function(){var e=[];if(null!==s){for(var r=o+s;i.pos<r;)e[e.length]=t.decode(i);if(i.pos!=r)throw new Error("Content size is not correct for container starting at offset "+o)}else try{for(;;){var n=t.decode(i);if(n.tag.isEOC())break;e[e.length]=n}s=o-i.pos}catch(t){throw new Error("Exception while decoding undefined length content: "+t)}return e};if(n.tagConstructed)a=u();else if(n.isUniversal()&&(3==n.tagNumber||4==n.tagNumber))try{if(3==n.tagNumber&&0!=i.get())throw new Error("BIT STRINGs with unused bits cannot encapsulate.");a=u();for(var c=0;c<a.length;++c)if(a[c].tag.isEOC())throw new Error("EOC is not supposed to be actual content.")}catch(t){a=null}if(null===a){if(null===s)throw new Error("We can't skip over an invalid tag with undefined length at offset "+o);i.pos=o+Math.abs(s)}return new t(r,h,s,n,a)},t}(),w=function(){function t(t){var e=t.get();if(this.tagClass=e>>6,this.tagConstructed=0!=(32&e),this.tagNumber=31&e,31==this.tagNumber){var i=new v;do{e=t.get(),i.mulAdd(128,127&e)}while(128&e);this.tagNumber=i.simplify()}}return t.prototype.isUniversal=function(){return 0===this.tagClass},t.prototype.isEOC=function(){return 0===this.tagClass&&0===this.tagNumber},t}(),D=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],x=(1<<26)/D[D.length-1],R=function(){function t(t,e,i){null!=t&&("number"==typeof t?this.fromNumber(t,e,i):null==e&&"string"!=typeof t?this.fromString(t,256):this.fromString(t,e))}return t.prototype.toString=function(t){if(this.s<0)return"-"+this.negate().toString(t);var e;if(16==t)e=4;else if(8==t)e=3;else if(2==t)e=1;else if(32==t)e=5;else{if(4!=t)return this.toRadix(t);e=2}var r,n=(1<<e)-1,s=!1,o="",h=this.t,a=this.DB-h*this.DB%e;if(h-- >0)for(a<this.DB&&(r=this[h]>>a)>0&&(s=!0,o=i(r));h>=0;)a<e?(r=(this[h]&(1<<a)-1)<<e-a,r|=this[--h]>>(a+=this.DB-e)):(r=this[h]>>(a-=e)&n,a<=0&&(a+=this.DB,--h)),r>0&&(s=!0),s&&(o+=i(r));return s?o:"0"},t.prototype.negate=function(){var e=I();return t.ZERO.subTo(this,e),e},t.prototype.abs=function(){return this.s<0?this.negate():this},t.prototype.compareTo=function(t){var e=this.s-t.s;if(0!=e)return e;var i=this.t;if(0!=(e=i-t.t))return this.s<0?-e:e;for(;--i>=0;)if(0!=(e=this[i]-t[i]))return e;return 0},t.prototype.bitLength=function(){return this.t<=0?0:this.DB*(this.t-1)+C(this[this.t-1]^this.s&this.DM)},t.prototype.mod=function(e){var i=I();return this.abs().divRemTo(e,null,i),this.s<0&&i.compareTo(t.ZERO)>0&&e.subTo(i,i),i},t.prototype.modPowInt=function(t,e){var i;return i=t<256||e.isEven()?new O(e):new A(e),this.exp(t,i)},t.prototype.clone=function(){var t=I();return this.copyTo(t),t},t.prototype.intValue=function(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]},t.prototype.byteValue=function(){return 0==this.t?this.s:this[0]<<24>>24},t.prototype.shortValue=function(){return 0==this.t?this.s:this[0]<<16>>16},t.prototype.signum=function(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1},t.prototype.toByteArray=function(){var t=this.t,e=[];e[0]=this.s;var i,r=this.DB-t*this.DB%8,n=0;if(t-- >0)for(r<this.DB&&(i=this[t]>>r)!=(this.s&this.DM)>>r&&(e[n++]=i|this.s<<this.DB-r);t>=0;)r<8?(i=(this[t]&(1<<r)-1)<<8-r,i|=this[--t]>>(r+=this.DB-8)):(i=this[t]>>(r-=8)&255,r<=0&&(r+=this.DB,--t)),0!=(128&i)&&(i|=-256),0==n&&(128&this.s)!=(128&i)&&++n,(n>0||i!=this.s)&&(e[n++]=i);return e},t.prototype.equals=function(t){return 0==this.compareTo(t)},t.prototype.min=function(t){return this.compareTo(t)<0?this:t},t.prototype.max=function(t){return this.compareTo(t)>0?this:t},t.prototype.and=function(t){var e=I();return this.bitwiseTo(t,r,e),e},t.prototype.or=function(t){var e=I();return this.bitwiseTo(t,n,e),e},t.prototype.xor=function(t){var e=I();return this.bitwiseTo(t,s,e),e},t.prototype.andNot=function(t){var e=I();return this.bitwiseTo(t,o,e),e},t.prototype.not=function(){for(var t=I(),e=0;e<this.t;++e)t[e]=this.DM&~this[e];return t.t=this.t,t.s=~this.s,t},t.prototype.shiftLeft=function(t){var e=I();return t<0?this.rShiftTo(-t,e):this.lShiftTo(t,e),e},t.prototype.shiftRight=function(t){var e=I();return t<0?this.lShiftTo(-t,e):this.rShiftTo(t,e),e},t.prototype.getLowestSetBit=function(){for(var t=0;t<this.t;++t)if(0!=this[t])return t*this.DB+h(this[t]);return this.s<0?this.t*this.DB:-1},t.prototype.bitCount=function(){for(var t=0,e=this.s&this.DM,i=0;i<this.t;++i)t+=a(this[i]^e);return t},t.prototype.testBit=function(t){var e=Math.floor(t/this.DB);return e>=this.t?0!=this.s:0!=(this[e]&1<<t%this.DB)},t.prototype.setBit=function(t){return this.changeBit(t,n)},t.prototype.clearBit=function(t){return this.changeBit(t,o)},t.prototype.flipBit=function(t){return this.changeBit(t,s)},t.prototype.add=function(t){var e=I();return this.addTo(t,e),e},t.prototype.subtract=function(t){var e=I();return this.subTo(t,e),e},t.prototype.multiply=function(t){var e=I();return this.multiplyTo(t,e),e},t.prototype.divide=function(t){var e=I();return this.divRemTo(t,e,null),e},t.prototype.remainder=function(t){var e=I();return this.divRemTo(t,null,e),e},t.prototype.divideAndRemainder=function(t){var e=I(),i=I();return this.divRemTo(t,e,i),[e,i]},t.prototype.modPow=function(t,e){var i,r,n=t.bitLength(),s=H(1);if(n<=0)return s;i=n<18?1:n<48?3:n<144?4:n<768?5:6,r=n<8?new O(e):e.isEven()?new V(e):new A(e);var o=[],h=3,a=i-1,u=(1<<i)-1;if(o[1]=r.convert(this),i>1){var c=I();for(r.sqrTo(o[1],c);h<=u;)o[h]=I(),r.mulTo(c,o[h-2],o[h]),h+=2}var f,l,p=t.t-1,g=!0,d=I();for(n=C(t[p])-1;p>=0;){for(n>=a?f=t[p]>>n-a&u:(f=(t[p]&(1<<n+1)-1)<<a-n,p>0&&(f|=t[p-1]>>this.DB+n-a)),h=i;0==(1&f);)f>>=1,--h;if((n-=h)<0&&(n+=this.DB,--p),g)o[f].copyTo(s),g=!1;else{for(;h>1;)r.sqrTo(s,d),r.sqrTo(d,s),h-=2;h>0?r.sqrTo(s,d):(l=s,s=d,d=l),r.mulTo(d,o[f],s)}for(;p>=0&&0==(t[p]&1<<n);)r.sqrTo(s,d),l=s,s=d,d=l,--n<0&&(n=this.DB-1,--p)}return r.revert(s)},t.prototype.modInverse=function(e){var i=e.isEven();if(this.isEven()&&i||0==e.signum())return t.ZERO;for(var r=e.clone(),n=this.clone(),s=H(1),o=H(0),h=H(0),a=H(1);0!=r.signum();){for(;r.isEven();)r.rShiftTo(1,r),i?(s.isEven()&&o.isEven()||(s.addTo(this,s),o.subTo(e,o)),s.rShiftTo(1,s)):o.isEven()||o.subTo(e,o),o.rShiftTo(1,o);for(;n.isEven();)n.rShiftTo(1,n),i?(h.isEven()&&a.isEven()||(h.addTo(this,h),a.subTo(e,a)),h.rShiftTo(1,h)):a.isEven()||a.subTo(e,a),a.rShiftTo(1,a);r.compareTo(n)>=0?(r.subTo(n,r),i&&s.subTo(h,s),o.subTo(a,o)):(n.subTo(r,n),i&&h.subTo(s,h),a.subTo(o,a))}return 0!=n.compareTo(t.ONE)?t.ZERO:a.compareTo(e)>=0?a.subtract(e):a.signum()<0?(a.addTo(e,a),a.signum()<0?a.add(e):a):a},t.prototype.pow=function(t){return this.exp(t,new B)},t.prototype.gcd=function(t){var e=this.s<0?this.negate():this.clone(),i=t.s<0?t.negate():t.clone();if(e.compareTo(i)<0){var r=e;e=i,i=r}var n=e.getLowestSetBit(),s=i.getLowestSetBit();if(s<0)return e;for(n<s&&(s=n),s>0&&(e.rShiftTo(s,e),i.rShiftTo(s,i));e.signum()>0;)(n=e.getLowestSetBit())>0&&e.rShiftTo(n,e),(n=i.getLowestSetBit())>0&&i.rShiftTo(n,i),e.compareTo(i)>=0?(e.subTo(i,e),e.rShiftTo(1,e)):(i.subTo(e,i),i.rShiftTo(1,i));return s>0&&i.lShiftTo(s,i),i},t.prototype.isProbablePrime=function(t){var e,i=this.abs();if(1==i.t&&i[0]<=D[D.length-1]){for(e=0;e<D.length;++e)if(i[0]==D[e])return!0;return!1}if(i.isEven())return!1;for(e=1;e<D.length;){for(var r=D[e],n=e+1;n<D.length&&r<x;)r*=D[n++];for(r=i.modInt(r);e<n;)if(r%D[e++]==0)return!1}return i.millerRabin(t)},t.prototype.copyTo=function(t){for(var e=this.t-1;e>=0;--e)t[e]=this[e];t.t=this.t,t.s=this.s},t.prototype.fromInt=function(t){this.t=1,this.s=t<0?-1:0,t>0?this[0]=t:t<-1?this[0]=t+this.DV:this.t=0},t.prototype.fromString=function(e,i){var r;if(16==i)r=4;else if(8==i)r=3;else if(256==i)r=8;else if(2==i)r=1;else if(32==i)r=5;else{if(4!=i)return void this.fromRadix(e,i);r=2}this.t=0,this.s=0;for(var n=e.length,s=!1,o=0;--n>=0;){var h=8==r?255&+e[n]:L(e,n);h<0?"-"==e.charAt(n)&&(s=!0):(s=!1,0==o?this[this.t++]=h:o+r>this.DB?(this[this.t-1]|=(h&(1<<this.DB-o)-1)<<o,this[this.t++]=h>>this.DB-o):this[this.t-1]|=h<<o,(o+=r)>=this.DB&&(o-=this.DB))}8==r&&0!=(128&+e[0])&&(this.s=-1,o>0&&(this[this.t-1]|=(1<<this.DB-o)-1<<o)),this.clamp(),s&&t.ZERO.subTo(this,this)},t.prototype.clamp=function(){for(var t=this.s&this.DM;this.t>0&&this[this.t-1]==t;)--this.t},t.prototype.dlShiftTo=function(t,e){var i;for(i=this.t-1;i>=0;--i)e[i+t]=this[i];for(i=t-1;i>=0;--i)e[i]=0;e.t=this.t+t,e.s=this.s},t.prototype.drShiftTo=function(t,e){for(var i=t;i<this.t;++i)e[i-t]=this[i];e.t=Math.max(this.t-t,0),e.s=this.s},t.prototype.lShiftTo=function(t,e){for(var i=t%this.DB,r=this.DB-i,n=(1<<r)-1,s=Math.floor(t/this.DB),o=this.s<<i&this.DM,h=this.t-1;h>=0;--h)e[h+s+1]=this[h]>>r|o,o=(this[h]&n)<<i;for(h=s-1;h>=0;--h)e[h]=0;e[s]=o,e.t=this.t+s+1,e.s=this.s,e.clamp()},t.prototype.rShiftTo=function(t,e){e.s=this.s;var i=Math.floor(t/this.DB);if(i>=this.t)e.t=0;else{var r=t%this.DB,n=this.DB-r,s=(1<<r)-1;e[0]=this[i]>>r;for(var o=i+1;o<this.t;++o)e[o-i-1]|=(this[o]&s)<<n,e[o-i]=this[o]>>r;r>0&&(e[this.t-i-1]|=(this.s&s)<<n),e.t=this.t-i,e.clamp()}},t.prototype.subTo=function(t,e){for(var i=0,r=0,n=Math.min(t.t,this.t);i<n;)r+=this[i]-t[i],e[i++]=r&this.DM,r>>=this.DB;if(t.t<this.t){for(r-=t.s;i<this.t;)r+=this[i],e[i++]=r&this.DM,r>>=this.DB;r+=this.s}else{for(r+=this.s;i<t.t;)r-=t[i],e[i++]=r&this.DM,r>>=this.DB;r-=t.s}e.s=r<0?-1:0,r<-1?e[i++]=this.DV+r:r>0&&(e[i++]=r),e.t=i,e.clamp()},t.prototype.multiplyTo=function(e,i){var r=this.abs(),n=e.abs(),s=r.t;for(i.t=s+n.t;--s>=0;)i[s]=0;for(s=0;s<n.t;++s)i[s+r.t]=r.am(0,n[s],i,s,0,r.t);i.s=0,i.clamp(),this.s!=e.s&&t.ZERO.subTo(i,i)},t.prototype.squareTo=function(t){for(var e=this.abs(),i=t.t=2*e.t;--i>=0;)t[i]=0;for(i=0;i<e.t-1;++i){var r=e.am(i,e[i],t,2*i,0,1);(t[i+e.t]+=e.am(i+1,2*e[i],t,2*i+1,r,e.t-i-1))>=e.DV&&(t[i+e.t]-=e.DV,t[i+e.t+1]=1)}t.t>0&&(t[t.t-1]+=e.am(i,e[i],t,2*i,0,1)),t.s=0,t.clamp()},t.prototype.divRemTo=function(e,i,r){var n=e.abs();if(!(n.t<=0)){var s=this.abs();if(s.t<n.t)return null!=i&&i.fromInt(0),void(null!=r&&this.copyTo(r));null==r&&(r=I());var o=I(),h=this.s,a=e.s,u=this.DB-C(n[n.t-1]);u>0?(n.lShiftTo(u,o),s.lShiftTo(u,r)):(n.copyTo(o),s.copyTo(r));var c=o.t,f=o[c-1];if(0!=f){var l=f*(1<<this.F1)+(c>1?o[c-2]>>this.F2:0),p=this.FV/l,g=(1<<this.F1)/l,d=1<<this.F2,v=r.t,m=v-c,y=null==i?I():i;for(o.dlShiftTo(m,y),r.compareTo(y)>=0&&(r[r.t++]=1,r.subTo(y,r)),t.ONE.dlShiftTo(c,y),y.subTo(o,o);o.t<c;)o[o.t++]=0;for(;--m>=0;){var b=r[--v]==f?this.DM:Math.floor(r[v]*p+(r[v-1]+d)*g);if((r[v]+=o.am(0,b,r,m,0,c))<b)for(o.dlShiftTo(m,y),r.subTo(y,r);r[v]<--b;)r.subTo(y,r)}null!=i&&(r.drShiftTo(c,i),h!=a&&t.ZERO.subTo(i,i)),r.t=c,r.clamp(),u>0&&r.rShiftTo(u,r),h<0&&t.ZERO.subTo(r,r)}}},t.prototype.invDigit=function(){if(this.t<1)return 0;var t=this[0];if(0==(1&t))return 0;var e=3&t;return(e=(e=(e=(e=e*(2-(15&t)*e)&15)*(2-(255&t)*e)&255)*(2-((65535&t)*e&65535))&65535)*(2-t*e%this.DV)%this.DV)>0?this.DV-e:-e},t.prototype.isEven=function(){return 0==(this.t>0?1&this[0]:this.s)},t.prototype.exp=function(e,i){if(e>4294967295||e<1)return t.ONE;var r=I(),n=I(),s=i.convert(this),o=C(e)-1;for(s.copyTo(r);--o>=0;)if(i.sqrTo(r,n),(e&1<<o)>0)i.mulTo(n,s,r);else{var h=r;r=n,n=h}return i.revert(r)},t.prototype.chunkSize=function(t){return Math.floor(Math.LN2*this.DB/Math.log(t))},t.prototype.toRadix=function(t){if(null==t&&(t=10),0==this.signum()||t<2||t>36)return"0";var e=this.chunkSize(t),i=Math.pow(t,e),r=H(i),n=I(),s=I(),o="";for(this.divRemTo(r,n,s);n.signum()>0;)o=(i+s.intValue()).toString(t).substr(1)+o,n.divRemTo(r,n,s);return s.intValue().toString(t)+o},t.prototype.fromRadix=function(e,i){this.fromInt(0),null==i&&(i=10);for(var r=this.chunkSize(i),n=Math.pow(i,r),s=!1,o=0,h=0,a=0;a<e.length;++a){var u=L(e,a);u<0?"-"==e.charAt(a)&&0==this.signum()&&(s=!0):(h=i*h+u,++o>=r&&(this.dMultiply(n),this.dAddOffset(h,0),o=0,h=0))}o>0&&(this.dMultiply(Math.pow(i,o)),this.dAddOffset(h,0)),s&&t.ZERO.subTo(this,this)},t.prototype.fromNumber=function(e,i,r){if("number"==typeof i)if(e<2)this.fromInt(1);else for(this.fromNumber(e,r),this.testBit(e-1)||this.bitwiseTo(t.ONE.shiftLeft(e-1),n,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(i);)this.dAddOffset(2,0),this.bitLength()>e&&this.subTo(t.ONE.shiftLeft(e-1),this);else{var s=[],o=7&e;s.length=1+(e>>3),i.nextBytes(s),o>0?s[0]&=(1<<o)-1:s[0]=0,this.fromString(s,256)}},t.prototype.bitwiseTo=function(t,e,i){var r,n,s=Math.min(t.t,this.t);for(r=0;r<s;++r)i[r]=e(this[r],t[r]);if(t.t<this.t){for(n=t.s&this.DM,r=s;r<this.t;++r)i[r]=e(this[r],n);i.t=this.t}else{for(n=this.s&this.DM,r=s;r<t.t;++r)i[r]=e(n,t[r]);i.t=t.t}i.s=e(this.s,t.s),i.clamp()},t.prototype.changeBit=function(e,i){var r=t.ONE.shiftLeft(e);return this.bitwiseTo(r,i,r),r},t.prototype.addTo=function(t,e){for(var i=0,r=0,n=Math.min(t.t,this.t);i<n;)r+=this[i]+t[i],e[i++]=r&this.DM,r>>=this.DB;if(t.t<this.t){for(r+=t.s;i<this.t;)r+=this[i],e[i++]=r&this.DM,r>>=this.DB;r+=this.s}else{for(r+=this.s;i<t.t;)r+=t[i],e[i++]=r&this.DM,r>>=this.DB;r+=t.s}e.s=r<0?-1:0,r>0?e[i++]=r:r<-1&&(e[i++]=this.DV+r),e.t=i,e.clamp()},t.prototype.dMultiply=function(t){this[this.t]=this.am(0,t-1,this,0,0,this.t),++this.t,this.clamp()},t.prototype.dAddOffset=function(t,e){if(0!=t){for(;this.t<=e;)this[this.t++]=0;for(this[e]+=t;this[e]>=this.DV;)this[e]-=this.DV,++e>=this.t&&(this[this.t++]=0),++this[e]}},t.prototype.multiplyLowerTo=function(t,e,i){var r=Math.min(this.t+t.t,e);for(i.s=0,i.t=r;r>0;)i[--r]=0;for(var n=i.t-this.t;r<n;++r)i[r+this.t]=this.am(0,t[r],i,r,0,this.t);for(n=Math.min(t.t,e);r<n;++r)this.am(0,t[r],i,r,0,e-r);i.clamp()},t.prototype.multiplyUpperTo=function(t,e,i){--e;var r=i.t=this.t+t.t-e;for(i.s=0;--r>=0;)i[r]=0;for(r=Math.max(e-this.t,0);r<t.t;++r)i[this.t+r-e]=this.am(e-r,t[r],i,0,0,this.t+r-e);i.clamp(),i.drShiftTo(1,i)},t.prototype.modInt=function(t){if(t<=0)return 0;var e=this.DV%t,i=this.s<0?t-1:0;if(this.t>0)if(0==e)i=this[0]%t;else for(var r=this.t-1;r>=0;--r)i=(e*i+this[r])%t;return i},t.prototype.millerRabin=function(e){var i=this.subtract(t.ONE),r=i.getLowestSetBit();if(r<=0)return!1;var n=i.shiftRight(r);(e=e+1>>1)>D.length&&(e=D.length);for(var s=I(),o=0;o<e;++o){s.fromInt(D[Math.floor(Math.random()*D.length)]);var h=s.modPow(n,this);if(0!=h.compareTo(t.ONE)&&0!=h.compareTo(i)){for(var a=1;a++<r&&0!=h.compareTo(i);)if(0==(h=h.modPowInt(2,this)).compareTo(t.ONE))return!1;if(0!=h.compareTo(i))return!1}}return!0},t.prototype.square=function(){var t=I();return this.squareTo(t),t},t.prototype.gcda=function(t,e){var i=this.s<0?this.negate():this.clone(),r=t.s<0?t.negate():t.clone();if(i.compareTo(r)<0){var n=i;i=r,r=n}var s=i.getLowestSetBit(),o=r.getLowestSetBit();if(o<0)e(i);else{s<o&&(o=s),o>0&&(i.rShiftTo(o,i),r.rShiftTo(o,r));var h=function(){(s=i.getLowestSetBit())>0&&i.rShiftTo(s,i),(s=r.getLowestSetBit())>0&&r.rShiftTo(s,r),i.compareTo(r)>=0?(i.subTo(r,i),i.rShiftTo(1,i)):(r.subTo(i,r),r.rShiftTo(1,r)),i.signum()>0?setTimeout(h,0):(o>0&&r.lShiftTo(o,r),setTimeout((function(){e(r)}),0))};setTimeout(h,10)}},t.prototype.fromNumberAsync=function(e,i,r,s){if("number"==typeof i)if(e<2)this.fromInt(1);else{this.fromNumber(e,r),this.testBit(e-1)||this.bitwiseTo(t.ONE.shiftLeft(e-1),n,this),this.isEven()&&this.dAddOffset(1,0);var o=this,h=function(){o.dAddOffset(2,0),o.bitLength()>e&&o.subTo(t.ONE.shiftLeft(e-1),o),o.isProbablePrime(i)?setTimeout((function(){s()}),0):setTimeout(h,0)};setTimeout(h,0)}else{var a=[],u=7&e;a.length=1+(e>>3),i.nextBytes(a),u>0?a[0]&=(1<<u)-1:a[0]=0,this.fromString(a,256)}},t}(),B=function(){function t(){}return t.prototype.convert=function(t){return t},t.prototype.revert=function(t){return t},t.prototype.mulTo=function(t,e,i){t.multiplyTo(e,i)},t.prototype.sqrTo=function(t,e){t.squareTo(e)},t}(),O=function(){function t(t){this.m=t}return t.prototype.convert=function(t){return t.s<0||t.compareTo(this.m)>=0?t.mod(this.m):t},t.prototype.revert=function(t){return t},t.prototype.reduce=function(t){t.divRemTo(this.m,null,t)},t.prototype.mulTo=function(t,e,i){t.multiplyTo(e,i),this.reduce(i)},t.prototype.sqrTo=function(t,e){t.squareTo(e),this.reduce(e)},t}(),A=function(){function t(t){this.m=t,this.mp=t.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<t.DB-15)-1,this.mt2=2*t.t}return t.prototype.convert=function(t){var e=I();return t.abs().dlShiftTo(this.m.t,e),e.divRemTo(this.m,null,e),t.s<0&&e.compareTo(R.ZERO)>0&&this.m.subTo(e,e),e},t.prototype.revert=function(t){var e=I();return t.copyTo(e),this.reduce(e),e},t.prototype.reduce=function(t){for(;t.t<=this.mt2;)t[t.t++]=0;for(var e=0;e<this.m.t;++e){var i=32767&t[e],r=i*this.mpl+((i*this.mph+(t[e]>>15)*this.mpl&this.um)<<15)&t.DM;for(t[i=e+this.m.t]+=this.m.am(0,r,t,e,0,this.m.t);t[i]>=t.DV;)t[i]-=t.DV,t[++i]++}t.clamp(),t.drShiftTo(this.m.t,t),t.compareTo(this.m)>=0&&t.subTo(this.m,t)},t.prototype.mulTo=function(t,e,i){t.multiplyTo(e,i),this.reduce(i)},t.prototype.sqrTo=function(t,e){t.squareTo(e),this.reduce(e)},t}(),V=function(){function t(t){this.m=t,this.r2=I(),this.q3=I(),R.ONE.dlShiftTo(2*t.t,this.r2),this.mu=this.r2.divide(t)}return t.prototype.convert=function(t){if(t.s<0||t.t>2*this.m.t)return t.mod(this.m);if(t.compareTo(this.m)<0)return t;var e=I();return t.copyTo(e),this.reduce(e),e},t.prototype.revert=function(t){return t},t.prototype.reduce=function(t){for(t.drShiftTo(this.m.t-1,this.r2),t.t>this.m.t+1&&(t.t=this.m.t+1,t.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);t.compareTo(this.r2)<0;)t.dAddOffset(1,this.m.t+1);for(t.subTo(this.r2,t);t.compareTo(this.m)>=0;)t.subTo(this.m,t)},t.prototype.mulTo=function(t,e,i){t.multiplyTo(e,i),this.reduce(i)},t.prototype.sqrTo=function(t,e){t.squareTo(e),this.reduce(e)},t}();function I(){return new R(null)}function N(t,e){return new R(t,e)}var P="undefined"!=typeof navigator;P&&"Microsoft Internet Explorer"==navigator.appName?(R.prototype.am=function(t,e,i,r,n,s){for(var o=32767&e,h=e>>15;--s>=0;){var a=32767&this[t],u=this[t++]>>15,c=h*a+u*o;n=((a=o*a+((32767&c)<<15)+i[r]+(1073741823&n))>>>30)+(c>>>15)+h*u+(n>>>30),i[r++]=1073741823&a}return n},T=30):P&&"Netscape"!=navigator.appName?(R.prototype.am=function(t,e,i,r,n,s){for(;--s>=0;){var o=e*this[t++]+i[r]+n;n=Math.floor(o/67108864),i[r++]=67108863&o}return n},T=26):(R.prototype.am=function(t,e,i,r,n,s){for(var o=16383&e,h=e>>14;--s>=0;){var a=16383&this[t],u=this[t++]>>14,c=h*a+u*o;n=((a=o*a+((16383&c)<<14)+i[r]+n)>>28)+(c>>14)+h*u,i[r++]=268435455&a}return n},T=28),R.prototype.DB=T,R.prototype.DM=(1<<T)-1,R.prototype.DV=1<<T,R.prototype.FV=Math.pow(2,52),R.prototype.F1=52-T,R.prototype.F2=2*T-52;var M,j,q=[];for(M="0".charCodeAt(0),j=0;j<=9;++j)q[M++]=j;for(M="a".charCodeAt(0),j=10;j<36;++j)q[M++]=j;for(M="A".charCodeAt(0),j=10;j<36;++j)q[M++]=j;function L(t,e){var i=q[t.charCodeAt(e)];return null==i?-1:i}function H(t){var e=I();return e.fromInt(t),e}function C(t){var e,i=1;return 0!=(e=t>>>16)&&(t=e,i+=16),0!=(e=t>>8)&&(t=e,i+=8),0!=(e=t>>4)&&(t=e,i+=4),0!=(e=t>>2)&&(t=e,i+=2),0!=(e=t>>1)&&(t=e,i+=1),i}R.ZERO=H(0),R.ONE=H(1);var F,U,K=function(){function t(){this.i=0,this.j=0,this.S=[]}return t.prototype.init=function(t){var e,i,r;for(e=0;e<256;++e)this.S[e]=e;for(i=0,e=0;e<256;++e)i=i+this.S[e]+t[e%t.length]&255,r=this.S[e],this.S[e]=this.S[i],this.S[i]=r;this.i=0,this.j=0},t.prototype.next=function(){var t;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,t=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=t,this.S[t+this.S[this.i]&255]},t}(),k=null;if(null==k){k=[],U=0;var _=void 0;if("undefined"!=typeof window&&window.crypto&&window.crypto.getRandomValues){var z=new Uint32Array(256);for(window.crypto.getRandomValues(z),_=0;_<z.length;++_)k[U++]=255&z[_]}var Z=0,G=function(t){if((Z=Z||0)>=256||U>=256)window.removeEventListener?window.removeEventListener("mousemove",G,!1):window.detachEvent&&window.detachEvent("onmousemove",G);else try{var e=t.x+t.y;k[U++]=255&e,Z+=1}catch(t){}};"undefined"!=typeof window&&(window.addEventListener?window.addEventListener("mousemove",G,!1):window.attachEvent&&window.attachEvent("onmousemove",G))}function $(){if(null==F){for(F=new K;U<256;){var t=Math.floor(65536*Math.random());k[U++]=255&t}for(F.init(k),U=0;U<k.length;++U)k[U]=0;U=0}return F.next()}var Y=function(){function t(){}return t.prototype.nextBytes=function(t){for(var e=0;e<t.length;++e)t[e]=$()},t}(),J=function(){function t(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null}return t.prototype.doPublic=function(t){return t.modPowInt(this.e,this.n)},t.prototype.doPrivate=function(t){if(null==this.p||null==this.q)return t.modPow(this.d,this.n);for(var e=t.mod(this.p).modPow(this.dmp1,this.p),i=t.mod(this.q).modPow(this.dmq1,this.q);e.compareTo(i)<0;)e=e.add(this.p);return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)},t.prototype.setPublic=function(t,e){null!=t&&null!=e&&t.length>0&&e.length>0?(this.n=N(t,16),this.e=parseInt(e,16)):console.error("Invalid RSA public key")},t.prototype.encrypt=function(t){var e=this.n.bitLength()+7>>3,i=function(t,e){if(e<t.length+11)return console.error("Message too long for RSA"),null;for(var i=[],r=t.length-1;r>=0&&e>0;){var n=t.charCodeAt(r--);n<128?i[--e]=n:n>127&&n<2048?(i[--e]=63&n|128,i[--e]=n>>6|192):(i[--e]=63&n|128,i[--e]=n>>6&63|128,i[--e]=n>>12|224)}i[--e]=0;for(var s=new Y,o=[];e>2;){for(o[0]=0;0==o[0];)s.nextBytes(o);i[--e]=o[0]}return i[--e]=2,i[--e]=0,new R(i)}(t,e);if(null==i)return null;var r=this.doPublic(i);if(null==r)return null;for(var n=r.toString(16),s=n.length,o=0;o<2*e-s;o++)n="0"+n;return n},t.prototype.setPrivate=function(t,e,i){null!=t&&null!=e&&t.length>0&&e.length>0?(this.n=N(t,16),this.e=parseInt(e,16),this.d=N(i,16)):console.error("Invalid RSA private key")},t.prototype.setPrivateEx=function(t,e,i,r,n,s,o,h){null!=t&&null!=e&&t.length>0&&e.length>0?(this.n=N(t,16),this.e=parseInt(e,16),this.d=N(i,16),this.p=N(r,16),this.q=N(n,16),this.dmp1=N(s,16),this.dmq1=N(o,16),this.coeff=N(h,16)):console.error("Invalid RSA private key")},t.prototype.generate=function(t,e){var i=new Y,r=t>>1;this.e=parseInt(e,16);for(var n=new R(e,16);;){for(;this.p=new R(t-r,1,i),0!=this.p.subtract(R.ONE).gcd(n).compareTo(R.ONE)||!this.p.isProbablePrime(10););for(;this.q=new R(r,1,i),0!=this.q.subtract(R.ONE).gcd(n).compareTo(R.ONE)||!this.q.isProbablePrime(10););if(this.p.compareTo(this.q)<=0){var s=this.p;this.p=this.q,this.q=s}var o=this.p.subtract(R.ONE),h=this.q.subtract(R.ONE),a=o.multiply(h);if(0==a.gcd(n).compareTo(R.ONE)){this.n=this.p.multiply(this.q),this.d=n.modInverse(a),this.dmp1=this.d.mod(o),this.dmq1=this.d.mod(h),this.coeff=this.q.modInverse(this.p);break}}},t.prototype.decrypt=function(t){var e=N(t,16),i=this.doPrivate(e);return null==i?null:function(t,e){for(var i=t.toByteArray(),r=0;r<i.length&&0==i[r];)++r;if(i.length-r!=e-1||2!=i[r])return null;for(++r;0!=i[r];)if(++r>=i.length)return null;for(var n="";++r<i.length;){var s=255&i[r];s<128?n+=String.fromCharCode(s):s>191&&s<224?(n+=String.fromCharCode((31&s)<<6|63&i[r+1]),++r):(n+=String.fromCharCode((15&s)<<12|(63&i[r+1])<<6|63&i[r+2]),r+=2)}return n}(i,this.n.bitLength()+7>>3)},t.prototype.generateAsync=function(t,e,i){var r=new Y,n=t>>1;this.e=parseInt(e,16);var s=new R(e,16),o=this,h=function(){var e=function(){if(o.p.compareTo(o.q)<=0){var t=o.p;o.p=o.q,o.q=t}var e=o.p.subtract(R.ONE),r=o.q.subtract(R.ONE),n=e.multiply(r);0==n.gcd(s).compareTo(R.ONE)?(o.n=o.p.multiply(o.q),o.d=s.modInverse(n),o.dmp1=o.d.mod(e),o.dmq1=o.d.mod(r),o.coeff=o.q.modInverse(o.p),setTimeout((function(){i()}),0)):setTimeout(h,0)},a=function(){o.q=I(),o.q.fromNumberAsync(n,1,r,(function(){o.q.subtract(R.ONE).gcda(s,(function(t){0==t.compareTo(R.ONE)&&o.q.isProbablePrime(10)?setTimeout(e,0):setTimeout(a,0)}))}))},u=function(){o.p=I(),o.p.fromNumberAsync(t-n,1,r,(function(){o.p.subtract(R.ONE).gcda(s,(function(t){0==t.compareTo(R.ONE)&&o.p.isProbablePrime(10)?setTimeout(a,0):setTimeout(u,0)}))}))};setTimeout(u,0)};setTimeout(h,0)},t.prototype.sign=function(t,e,i){var r=function(t,e){if(e<t.length+22)return console.error("Message too long for RSA"),null;for(var i=e-t.length-6,r="",n=0;n<i;n+=2)r+="ff";return N("0001"+r+"00"+t,16)}((X[i]||"")+e(t).toString(),this.n.bitLength()/4);if(null==r)return null;var n=this.doPrivate(r);if(null==n)return null;var s=n.toString(16);return 0==(1&s.length)?s:"0"+s},t.prototype.verify=function(t,e,i){var r=N(e,16),n=this.doPublic(r);return null==n?null:function(t){for(var e in X)if(X.hasOwnProperty(e)){var i=X[e],r=i.length;if(t.substr(0,r)==i)return t.substr(r)}return t}(n.toString(16).replace(/^1f+00/,""))==i(t).toString()},t}(),X={md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",ripemd160:"3021300906052b2403020105000414"},Q={};Q.lang={extend:function(t,e,i){if(!e||!t)throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");var r=function(){};if(r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t,t.superclass=e.prototype,e.prototype.constructor==Object.prototype.constructor&&(e.prototype.constructor=e),i){var n;for(n in i)t.prototype[n]=i[n];var s=function(){},o=["toString","valueOf"];try{/MSIE/.test(navigator.userAgent)&&(s=function(t,e){for(n=0;n<o.length;n+=1){var i=o[n],r=e[i];"function"==typeof r&&r!=Object.prototype[i]&&(t[i]=r)}})}catch(t){}s(t.prototype,i)}}};var W={};void 0!==W.asn1&&W.asn1||(W.asn1={}),W.asn1.ASN1Util=new function(){this.integerToByteHex=function(t){var e=t.toString(16);return e.length%2==1&&(e="0"+e),e},this.bigIntToMinTwosComplementsHex=function(t){var e=t.toString(16);if("-"!=e.substr(0,1))e.length%2==1?e="0"+e:e.match(/^[0-7]/)||(e="00"+e);else{var i=e.substr(1).length;i%2==1?i+=1:e.match(/^[0-7]/)||(i+=2);for(var r="",n=0;n<i;n++)r+="f";e=new R(r,16).xor(t).add(R.ONE).toString(16).replace(/^-/,"")}return e},this.getPEMStringFromHex=function(t,e){return hextopem(t,e)},this.newObject=function(t){var e=W.asn1,i=e.DERBoolean,r=e.DERInteger,n=e.DERBitString,s=e.DEROctetString,o=e.DERNull,h=e.DERObjectIdentifier,a=e.DEREnumerated,u=e.DERUTF8String,c=e.DERNumericString,f=e.DERPrintableString,l=e.DERTeletexString,p=e.DERIA5String,g=e.DERUTCTime,d=e.DERGeneralizedTime,v=e.DERSequence,m=e.DERSet,y=e.DERTaggedObject,b=e.ASN1Util.newObject,T=Object.keys(t);if(1!=T.length)throw"key of param shall be only one.";var S=T[0];if(-1==":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":"+S+":"))throw"undefined key: "+S;if("bool"==S)return new i(t[S]);if("int"==S)return new r(t[S]);if("bitstr"==S)return new n(t[S]);if("octstr"==S)return new s(t[S]);if("null"==S)return new o(t[S]);if("oid"==S)return new h(t[S]);if("enum"==S)return new a(t[S]);if("utf8str"==S)return new u(t[S]);if("numstr"==S)return new c(t[S]);if("prnstr"==S)return new f(t[S]);if("telstr"==S)return new l(t[S]);if("ia5str"==S)return new p(t[S]);if("utctime"==S)return new g(t[S]);if("gentime"==S)return new d(t[S]);if("seq"==S){for(var E=t[S],w=[],D=0;D<E.length;D++){var x=b(E[D]);w.push(x)}return new v({array:w})}if("set"==S){for(E=t[S],w=[],D=0;D<E.length;D++)x=b(E[D]),w.push(x);return new m({array:w})}if("tag"==S){var R=t[S];if("[object Array]"===Object.prototype.toString.call(R)&&3==R.length){var B=b(R[2]);return new y({tag:R[0],explicit:R[1],obj:B})}var O={};if(void 0!==R.explicit&&(O.explicit=R.explicit),void 0!==R.tag&&(O.tag=R.tag),void 0===R.obj)throw"obj shall be specified for 'tag'.";return O.obj=b(R.obj),new y(O)}},this.jsonToASN1HEX=function(t){return this.newObject(t).getEncodedHex()}},W.asn1.ASN1Util.oidHexToInt=function(t){for(var e="",i=parseInt(t.substr(0,2),16),r=(e=Math.floor(i/40)+"."+i%40,""),n=2;n<t.length;n+=2){var s=("00000000"+parseInt(t.substr(n,2),16).toString(2)).slice(-8);r+=s.substr(1,7),"0"==s.substr(0,1)&&(e=e+"."+new R(r,2).toString(10),r="")}return e},W.asn1.ASN1Util.oidIntToHex=function(t){var e=function(t){var e=t.toString(16);return 1==e.length&&(e="0"+e),e},i=function(t){var i="",r=new R(t,10).toString(2),n=7-r.length%7;7==n&&(n=0);for(var s="",o=0;o<n;o++)s+="0";for(r=s+r,o=0;o<r.length-1;o+=7){var h=r.substr(o,7);o!=r.length-7&&(h="1"+h),i+=e(parseInt(h,2))}return i};if(!t.match(/^[0-9.]+$/))throw"malformed oid string: "+t;var r="",n=t.split("."),s=40*parseInt(n[0])+parseInt(n[1]);r+=e(s),n.splice(0,2);for(var o=0;o<n.length;o++)r+=i(n[o]);return r},W.asn1.ASN1Object=function(){this.getLengthHexFromValue=function(){if(void 0===this.hV||null==this.hV)throw"this.hV is null or undefined.";if(this.hV.length%2==1)throw"value hex must be even length: n="+"".length+",v="+this.hV;var t=this.hV.length/2,e=t.toString(16);if(e.length%2==1&&(e="0"+e),t<128)return e;var i=e.length/2;if(i>15)throw"ASN.1 length too long to represent by 8x: n = "+t.toString(16);return(128+i).toString(16)+e},this.getEncodedHex=function(){return(null==this.hTLV||this.isModified)&&(this.hV=this.getFreshValueHex(),this.hL=this.getLengthHexFromValue(),this.hTLV=this.hT+this.hL+this.hV,this.isModified=!1),this.hTLV},this.getValueHex=function(){return this.getEncodedHex(),this.hV},this.getFreshValueHex=function(){return""}},W.asn1.DERAbstractString=function(t){W.asn1.DERAbstractString.superclass.constructor.call(this),this.getString=function(){return this.s},this.setString=function(t){this.hTLV=null,this.isModified=!0,this.s=t,this.hV=stohex(this.s)},this.setStringHex=function(t){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=t},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t?this.setString(t):void 0!==t.str?this.setString(t.str):void 0!==t.hex&&this.setStringHex(t.hex))},Q.lang.extend(W.asn1.DERAbstractString,W.asn1.ASN1Object),W.asn1.DERAbstractTime=function(t){W.asn1.DERAbstractTime.superclass.constructor.call(this),this.localDateToUTC=function(t){return utc=t.getTime()+6e4*t.getTimezoneOffset(),new Date(utc)},this.formatDate=function(t,e,i){var r=this.zeroPadding,n=this.localDateToUTC(t),s=String(n.getFullYear());"utc"==e&&(s=s.substr(2,2));var o=s+r(String(n.getMonth()+1),2)+r(String(n.getDate()),2)+r(String(n.getHours()),2)+r(String(n.getMinutes()),2)+r(String(n.getSeconds()),2);if(!0===i){var h=n.getMilliseconds();if(0!=h){var a=r(String(h),3);o=o+"."+(a=a.replace(/[0]+$/,""))}}return o+"Z"},this.zeroPadding=function(t,e){return t.length>=e?t:new Array(e-t.length+1).join("0")+t},this.getString=function(){return this.s},this.setString=function(t){this.hTLV=null,this.isModified=!0,this.s=t,this.hV=stohex(t)},this.setByDateValue=function(t,e,i,r,n,s){var o=new Date(Date.UTC(t,e-1,i,r,n,s,0));this.setByDate(o)},this.getFreshValueHex=function(){return this.hV}},Q.lang.extend(W.asn1.DERAbstractTime,W.asn1.ASN1Object),W.asn1.DERAbstractStructured=function(t){W.asn1.DERAbstractString.superclass.constructor.call(this),this.setByASN1ObjectArray=function(t){this.hTLV=null,this.isModified=!0,this.asn1Array=t},this.appendASN1Object=function(t){this.hTLV=null,this.isModified=!0,this.asn1Array.push(t)},this.asn1Array=new Array,void 0!==t&&void 0!==t.array&&(this.asn1Array=t.array)},Q.lang.extend(W.asn1.DERAbstractStructured,W.asn1.ASN1Object),W.asn1.DERBoolean=function(){W.asn1.DERBoolean.superclass.constructor.call(this),this.hT="01",this.hTLV="0101ff"},Q.lang.extend(W.asn1.DERBoolean,W.asn1.ASN1Object),W.asn1.DERInteger=function(t){W.asn1.DERInteger.superclass.constructor.call(this),this.hT="02",this.setByBigInteger=function(t){this.hTLV=null,this.isModified=!0,this.hV=W.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)},this.setByInteger=function(t){var e=new R(String(t),10);this.setByBigInteger(e)},this.setValueHex=function(t){this.hV=t},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.bigint?this.setByBigInteger(t.bigint):void 0!==t.int?this.setByInteger(t.int):"number"==typeof t?this.setByInteger(t):void 0!==t.hex&&this.setValueHex(t.hex))},Q.lang.extend(W.asn1.DERInteger,W.asn1.ASN1Object),W.asn1.DERBitString=function(t){if(void 0!==t&&void 0!==t.obj){var e=W.asn1.ASN1Util.newObject(t.obj);t.hex="00"+e.getEncodedHex()}W.asn1.DERBitString.superclass.constructor.call(this),this.hT="03",this.setHexValueIncludingUnusedBits=function(t){this.hTLV=null,this.isModified=!0,this.hV=t},this.setUnusedBitsAndHexValue=function(t,e){if(t<0||7<t)throw"unused bits shall be from 0 to 7: u = "+t;var i="0"+t;this.hTLV=null,this.isModified=!0,this.hV=i+e},this.setByBinaryString=function(t){var e=8-(t=t.replace(/0+$/,"")).length%8;8==e&&(e=0);for(var i=0;i<=e;i++)t+="0";var r="";for(i=0;i<t.length-1;i+=8){var n=t.substr(i,8),s=parseInt(n,2).toString(16);1==s.length&&(s="0"+s),r+=s}this.hTLV=null,this.isModified=!0,this.hV="0"+e+r},this.setByBooleanArray=function(t){for(var e="",i=0;i<t.length;i++)1==t[i]?e+="1":e+="0";this.setByBinaryString(e)},this.newFalseArray=function(t){for(var e=new Array(t),i=0;i<t;i++)e[i]=!1;return e},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t&&t.toLowerCase().match(/^[0-9a-f]+$/)?this.setHexValueIncludingUnusedBits(t):void 0!==t.hex?this.setHexValueIncludingUnusedBits(t.hex):void 0!==t.bin?this.setByBinaryString(t.bin):void 0!==t.array&&this.setByBooleanArray(t.array))},Q.lang.extend(W.asn1.DERBitString,W.asn1.ASN1Object),W.asn1.DEROctetString=function(t){if(void 0!==t&&void 0!==t.obj){var e=W.asn1.ASN1Util.newObject(t.obj);t.hex=e.getEncodedHex()}W.asn1.DEROctetString.superclass.constructor.call(this,t),this.hT="04"},Q.lang.extend(W.asn1.DEROctetString,W.asn1.DERAbstractString),W.asn1.DERNull=function(){W.asn1.DERNull.superclass.constructor.call(this),this.hT="05",this.hTLV="0500"},Q.lang.extend(W.asn1.DERNull,W.asn1.ASN1Object),W.asn1.DERObjectIdentifier=function(t){var e=function(t){var e=t.toString(16);return 1==e.length&&(e="0"+e),e},i=function(t){var i="",r=new R(t,10).toString(2),n=7-r.length%7;7==n&&(n=0);for(var s="",o=0;o<n;o++)s+="0";for(r=s+r,o=0;o<r.length-1;o+=7){var h=r.substr(o,7);o!=r.length-7&&(h="1"+h),i+=e(parseInt(h,2))}return i};W.asn1.DERObjectIdentifier.superclass.constructor.call(this),this.hT="06",this.setValueHex=function(t){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=t},this.setValueOidString=function(t){if(!t.match(/^[0-9.]+$/))throw"malformed oid string: "+t;var r="",n=t.split("."),s=40*parseInt(n[0])+parseInt(n[1]);r+=e(s),n.splice(0,2);for(var o=0;o<n.length;o++)r+=i(n[o]);this.hTLV=null,this.isModified=!0,this.s=null,this.hV=r},this.setValueName=function(t){var e=W.asn1.x509.OID.name2oid(t);if(""===e)throw"DERObjectIdentifier oidName undefined: "+t;this.setValueOidString(e)},this.getFreshValueHex=function(){return this.hV},void 0!==t&&("string"==typeof t?t.match(/^[0-2].[0-9.]+$/)?this.setValueOidString(t):this.setValueName(t):void 0!==t.oid?this.setValueOidString(t.oid):void 0!==t.hex?this.setValueHex(t.hex):void 0!==t.name&&this.setValueName(t.name))},Q.lang.extend(W.asn1.DERObjectIdentifier,W.asn1.ASN1Object),W.asn1.DEREnumerated=function(t){W.asn1.DEREnumerated.superclass.constructor.call(this),this.hT="0a",this.setByBigInteger=function(t){this.hTLV=null,this.isModified=!0,this.hV=W.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)},this.setByInteger=function(t){var e=new R(String(t),10);this.setByBigInteger(e)},this.setValueHex=function(t){this.hV=t},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.int?this.setByInteger(t.int):"number"==typeof t?this.setByInteger(t):void 0!==t.hex&&this.setValueHex(t.hex))},Q.lang.extend(W.asn1.DEREnumerated,W.asn1.ASN1Object),W.asn1.DERUTF8String=function(t){W.asn1.DERUTF8String.superclass.constructor.call(this,t),this.hT="0c"},Q.lang.extend(W.asn1.DERUTF8String,W.asn1.DERAbstractString),W.asn1.DERNumericString=function(t){W.asn1.DERNumericString.superclass.constructor.call(this,t),this.hT="12"},Q.lang.extend(W.asn1.DERNumericString,W.asn1.DERAbstractString),W.asn1.DERPrintableString=function(t){W.asn1.DERPrintableString.superclass.constructor.call(this,t),this.hT="13"},Q.lang.extend(W.asn1.DERPrintableString,W.asn1.DERAbstractString),W.asn1.DERTeletexString=function(t){W.asn1.DERTeletexString.superclass.constructor.call(this,t),this.hT="14"},Q.lang.extend(W.asn1.DERTeletexString,W.asn1.DERAbstractString),W.asn1.DERIA5String=function(t){W.asn1.DERIA5String.superclass.constructor.call(this,t),this.hT="16"},Q.lang.extend(W.asn1.DERIA5String,W.asn1.DERAbstractString),W.asn1.DERUTCTime=function(t){W.asn1.DERUTCTime.superclass.constructor.call(this,t),this.hT="17",this.setByDate=function(t){this.hTLV=null,this.isModified=!0,this.date=t,this.s=this.formatDate(this.date,"utc"),this.hV=stohex(this.s)},this.getFreshValueHex=function(){return void 0===this.date&&void 0===this.s&&(this.date=new Date,this.s=this.formatDate(this.date,"utc"),this.hV=stohex(this.s)),this.hV},void 0!==t&&(void 0!==t.str?this.setString(t.str):"string"==typeof t&&t.match(/^[0-9]{12}Z$/)?this.setString(t):void 0!==t.hex?this.setStringHex(t.hex):void 0!==t.date&&this.setByDate(t.date))},Q.lang.extend(W.asn1.DERUTCTime,W.asn1.DERAbstractTime),W.asn1.DERGeneralizedTime=function(t){W.asn1.DERGeneralizedTime.superclass.constructor.call(this,t),this.hT="18",this.withMillis=!1,this.setByDate=function(t){this.hTLV=null,this.isModified=!0,this.date=t,this.s=this.formatDate(this.date,"gen",this.withMillis),this.hV=stohex(this.s)},this.getFreshValueHex=function(){return void 0===this.date&&void 0===this.s&&(this.date=new Date,this.s=this.formatDate(this.date,"gen",this.withMillis),this.hV=stohex(this.s)),this.hV},void 0!==t&&(void 0!==t.str?this.setString(t.str):"string"==typeof t&&t.match(/^[0-9]{14}Z$/)?this.setString(t):void 0!==t.hex?this.setStringHex(t.hex):void 0!==t.date&&this.setByDate(t.date),!0===t.millis&&(this.withMillis=!0))},Q.lang.extend(W.asn1.DERGeneralizedTime,W.asn1.DERAbstractTime),W.asn1.DERSequence=function(t){W.asn1.DERSequence.superclass.constructor.call(this,t),this.hT="30",this.getFreshValueHex=function(){for(var t="",e=0;e<this.asn1Array.length;e++)t+=this.asn1Array[e].getEncodedHex();return this.hV=t,this.hV}},Q.lang.extend(W.asn1.DERSequence,W.asn1.DERAbstractStructured),W.asn1.DERSet=function(t){W.asn1.DERSet.superclass.constructor.call(this,t),this.hT="31",this.sortFlag=!0,this.getFreshValueHex=function(){for(var t=new Array,e=0;e<this.asn1Array.length;e++){var i=this.asn1Array[e];t.push(i.getEncodedHex())}return 1==this.sortFlag&&t.sort(),this.hV=t.join(""),this.hV},void 0!==t&&void 0!==t.sortflag&&0==t.sortflag&&(this.sortFlag=!1)},Q.lang.extend(W.asn1.DERSet,W.asn1.DERAbstractStructured),W.asn1.DERTaggedObject=function(t){W.asn1.DERTaggedObject.superclass.constructor.call(this),this.hT="a0",this.hV="",this.isExplicit=!0,this.asn1Object=null,this.setASN1Object=function(t,e,i){this.hT=e,this.isExplicit=t,this.asn1Object=i,this.isExplicit?(this.hV=this.asn1Object.getEncodedHex(),this.hTLV=null,this.isModified=!0):(this.hV=null,this.hTLV=i.getEncodedHex(),this.hTLV=this.hTLV.replace(/^../,e),this.isModified=!1)},this.getFreshValueHex=function(){return this.hV},void 0!==t&&(void 0!==t.tag&&(this.hT=t.tag),void 0!==t.explicit&&(this.isExplicit=t.explicit),void 0!==t.obj&&(this.asn1Object=t.obj,this.setASN1Object(this.isExplicit,this.hT,this.asn1Object)))},Q.lang.extend(W.asn1.DERTaggedObject,W.asn1.ASN1Object);var tt,et=(tt=function(t,e){return tt=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},tt(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}tt(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),it=function(t){function e(i){var r=t.call(this)||this;return i&&("string"==typeof i?r.parseKey(i):(e.hasPrivateKeyProperty(i)||e.hasPublicKeyProperty(i))&&r.parsePropertiesFrom(i)),r}return et(e,t),e.prototype.parseKey=function(t){try{var e=0,i=0,r=/^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t)?function(t){var e;if(void 0===u){var i="0123456789ABCDEF",r=" \f\n\r\t \u2028\u2029";for(u={},e=0;e<16;++e)u[i.charAt(e)]=e;for(i=i.toLowerCase(),e=10;e<16;++e)u[i.charAt(e)]=e;for(e=0;e<r.length;++e)u[r.charAt(e)]=-1}var n=[],s=0,o=0;for(e=0;e<t.length;++e){var h=t.charAt(e);if("="==h)break;if(-1!=(h=u[h])){if(void 0===h)throw new Error("Illegal character at offset "+e);s|=h,++o>=2?(n[n.length]=s,s=0,o=0):s<<=4}}if(o)throw new Error("Hex encoding incomplete: 4 bits missing");return n}(t):g.unarmor(t),n=E.decode(r);if(3===n.sub.length&&(n=n.sub[2].sub[0]),9===n.sub.length){e=n.sub[1].getHexStringValue(),this.n=N(e,16),i=n.sub[2].getHexStringValue(),this.e=parseInt(i,16);var s=n.sub[3].getHexStringValue();this.d=N(s,16);var o=n.sub[4].getHexStringValue();this.p=N(o,16);var h=n.sub[5].getHexStringValue();this.q=N(h,16);var a=n.sub[6].getHexStringValue();this.dmp1=N(a,16);var c=n.sub[7].getHexStringValue();this.dmq1=N(c,16);var f=n.sub[8].getHexStringValue();this.coeff=N(f,16)}else{if(2!==n.sub.length)return!1;if(n.sub[0].sub){var l=n.sub[1].sub[0];e=l.sub[0].getHexStringValue(),this.n=N(e,16),i=l.sub[1].getHexStringValue(),this.e=parseInt(i,16)}else e=n.sub[0].getHexStringValue(),this.n=N(e,16),i=n.sub[1].getHexStringValue(),this.e=parseInt(i,16)}return!0}catch(t){return!1}},e.prototype.getPrivateBaseKey=function(){var t={array:[new W.asn1.DERInteger({int:0}),new W.asn1.DERInteger({bigint:this.n}),new W.asn1.DERInteger({int:this.e}),new W.asn1.DERInteger({bigint:this.d}),new W.asn1.DERInteger({bigint:this.p}),new W.asn1.DERInteger({bigint:this.q}),new W.asn1.DERInteger({bigint:this.dmp1}),new W.asn1.DERInteger({bigint:this.dmq1}),new W.asn1.DERInteger({bigint:this.coeff})]};return new W.asn1.DERSequence(t).getEncodedHex()},e.prototype.getPrivateBaseKeyB64=function(){return f(this.getPrivateBaseKey())},e.prototype.getPublicBaseKey=function(){var t=new W.asn1.DERSequence({array:[new W.asn1.DERObjectIdentifier({oid:"1.2.840.113549.1.1.1"}),new W.asn1.DERNull]}),e=new W.asn1.DERSequence({array:[new W.asn1.DERInteger({bigint:this.n}),new W.asn1.DERInteger({int:this.e})]}),i=new W.asn1.DERBitString({hex:"00"+e.getEncodedHex()});return new W.asn1.DERSequence({array:[t,i]}).getEncodedHex()},e.prototype.getPublicBaseKeyB64=function(){return f(this.getPublicBaseKey())},e.wordwrap=function(t,e){if(!t)return t;var i="(.{1,"+(e=e||64)+"})( +|$\n?)|(.{1,"+e+"})";return t.match(RegExp(i,"g")).join("\n")},e.prototype.getPrivateKey=function(){var t="-----BEGIN RSA PRIVATE KEY-----\n";return(t+=e.wordwrap(this.getPrivateBaseKeyB64())+"\n")+"-----END RSA PRIVATE KEY-----"},e.prototype.getPublicKey=function(){var t="-----BEGIN PUBLIC KEY-----\n";return(t+=e.wordwrap(this.getPublicBaseKeyB64())+"\n")+"-----END PUBLIC KEY-----"},e.hasPublicKeyProperty=function(t){return(t=t||{}).hasOwnProperty("n")&&t.hasOwnProperty("e")},e.hasPrivateKeyProperty=function(t){return(t=t||{}).hasOwnProperty("n")&&t.hasOwnProperty("e")&&t.hasOwnProperty("d")&&t.hasOwnProperty("p")&&t.hasOwnProperty("q")&&t.hasOwnProperty("dmp1")&&t.hasOwnProperty("dmq1")&&t.hasOwnProperty("coeff")},e.prototype.parsePropertiesFrom=function(t){this.n=t.n,this.e=t.e,t.hasOwnProperty("d")&&(this.d=t.d,this.p=t.p,this.q=t.q,this.dmp1=t.dmp1,this.dmq1=t.dmq1,this.coeff=t.coeff)},e}(J);const rt=function(){function t(t){void 0===t&&(t={}),t=t||{},this.default_key_size=t.default_key_size?parseInt(t.default_key_size,10):1024,this.default_public_exponent=t.default_public_exponent||"010001",this.log=t.log||!1,this.key=null}return t.prototype.setKey=function(t){this.log&&this.key&&console.warn("A key was already set, overriding existing."),this.key=new it(t)},t.prototype.setPrivateKey=function(t){this.setKey(t)},t.prototype.setPublicKey=function(t){this.setKey(t)},t.prototype.decrypt=function(t){try{return this.getKey().decrypt(l(t))}catch(t){return!1}},t.prototype.encrypt=function(t){try{return f(this.getKey().encrypt(t))}catch(t){return!1}},t.prototype.sign=function(t,e,i){try{return f(this.getKey().sign(t,e,i))}catch(t){return!1}},t.prototype.verify=function(t,e,i){try{return this.getKey().verify(t,l(e),i)}catch(t){return!1}},t.prototype.getKey=function(t){if(!this.key){if(this.key=new it,t&&"[object Function]"==={}.toString.call(t))return void this.key.generateAsync(this.default_key_size,this.default_public_exponent,t);this.key.generate(this.default_key_size,this.default_public_exponent)}return this.key},t.prototype.getPrivateKey=function(){return this.getKey().getPrivateKey()},t.prototype.getPrivateKeyB64=function(){return this.getKey().getPrivateBaseKeyB64()},t.prototype.getPublicKey=function(){return this.getKey().getPublicKey()},t.prototype.getPublicKeyB64=function(){return this.getKey().getPublicBaseKeyB64()},t.version="3.2.1",t}();return e.default})()));

!function(t,e){"object"==typeof exports?module.exports=exports=e():"function"==typeof define&&define.amd?define([],e):t.CryptoJS=e()}(this,function(){var h,t,e,r,i,n,f,o,s,c,a,l,d,m,x,b,H,z,A,u,p,_,v,y,g,B,w,k,S,C,D,E,R,M,F,P,W,O,I,U,K,X,L,j,N,T,q,Z,V,G,J,$,Q,Y,tt,et,rt,it,nt,ot,st,ct,at,ht,lt,ft,dt,ut,pt,_t,vt,yt,gt,Bt,wt,kt,St,bt=bt||function(l){var t;if("undefined"!=typeof window&&window.crypto&&(t=window.crypto),!t&&"undefined"!=typeof window&&window.msCrypto&&(t=window.msCrypto),!t&&"undefined"!=typeof global&&global.crypto&&(t=global.crypto),!t&&"function"==typeof require)try{t=require("crypto")}catch(t){}function i(){if(t){if("function"==typeof t.getRandomValues)try{return t.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof t.randomBytes)try{return t.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")}var r=Object.create||function(t){var e;return n.prototype=t,e=new n,n.prototype=null,e};function n(){}var e={},o=e.lib={},s=o.Base={extend:function(t){var e=r(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),(e.init.prototype=e).$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},f=o.WordArray=s.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||a).stringify(this)},concat:function(t){var e=this.words,r=t.words,i=this.sigBytes,n=t.sigBytes;if(this.clamp(),i%4)for(var o=0;o<n;o++){var s=r[o>>>2]>>>24-o%4*8&255;e[i+o>>>2]|=s<<24-(i+o)%4*8}else for(o=0;o<n;o+=4)e[i+o>>>2]=r[o>>>2];return this.sigBytes+=n,this},clamp:function(){var t=this.words,e=this.sigBytes;t[e>>>2]&=4294967295<<32-e%4*8,t.length=l.ceil(e/4)},clone:function(){var t=s.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],r=0;r<t;r+=4)e.push(i());return new f.init(e,t)}}),c=e.enc={},a=c.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n++){var o=e[n>>>2]>>>24-n%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i+=2)r[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new f.init(r,e/2)}},h=c.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n++){var o=e[n>>>2]>>>24-n%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new f.init(r,e)}},d=c.Utf8={stringify:function(t){try{return decodeURIComponent(escape(h.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return h.parse(unescape(encodeURIComponent(t)))}},u=o.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new f.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=d.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(t){var e,r=this._data,i=r.words,n=r.sigBytes,o=this.blockSize,s=n/(4*o),c=(s=t?l.ceil(s):l.max((0|s)-this._minBufferSize,0))*o,a=l.min(4*c,n);if(c){for(var h=0;h<c;h+=o)this._doProcessBlock(i,h);e=i.splice(0,c),r.sigBytes-=a}return new f.init(e,a)},clone:function(){var t=s.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),p=(o.Hasher=u.extend({cfg:s.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){u.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(r){return function(t,e){return new r.init(e).finalize(t)}},_createHmacHelper:function(r){return function(t,e){return new p.HMAC.init(r,e).finalize(t)}}}),e.algo={});return e}(Math);function mt(t,e,r){return t^e^r}function xt(t,e,r){return t&e|~t&r}function Ht(t,e,r){return(t|~e)^r}function zt(t,e,r){return t&r|e&~r}function At(t,e,r){return t^(e|~r)}function Ct(t,e){return t<<e|t>>>32-e}function Dt(t,e,r,i){var n,o=this._iv;o?(n=o.slice(0),this._iv=void 0):n=this._prevBlock,i.encryptBlock(n,0);for(var s=0;s<r;s++)t[e+s]^=n[s]}function Et(t){if(255==(t>>24&255)){var e=t>>16&255,r=t>>8&255,i=255&t;255===e?(e=0,255===r?(r=0,255===i?i=0:++i):++r):++e,t=0,t+=e<<16,t+=r<<8,t+=i}else t+=1<<24;return t}function Rt(){for(var t=this._X,e=this._C,r=0;r<8;r++)ft[r]=e[r];e[0]=e[0]+1295307597+this._b|0,e[1]=e[1]+3545052371+(e[0]>>>0<ft[0]>>>0?1:0)|0,e[2]=e[2]+886263092+(e[1]>>>0<ft[1]>>>0?1:0)|0,e[3]=e[3]+1295307597+(e[2]>>>0<ft[2]>>>0?1:0)|0,e[4]=e[4]+3545052371+(e[3]>>>0<ft[3]>>>0?1:0)|0,e[5]=e[5]+886263092+(e[4]>>>0<ft[4]>>>0?1:0)|0,e[6]=e[6]+1295307597+(e[5]>>>0<ft[5]>>>0?1:0)|0,e[7]=e[7]+3545052371+(e[6]>>>0<ft[6]>>>0?1:0)|0,this._b=e[7]>>>0<ft[7]>>>0?1:0;for(r=0;r<8;r++){var i=t[r]+e[r],n=65535&i,o=i>>>16,s=((n*n>>>17)+n*o>>>15)+o*o,c=((4294901760&i)*i|0)+((65535&i)*i|0);dt[r]=s^c}t[0]=dt[0]+(dt[7]<<16|dt[7]>>>16)+(dt[6]<<16|dt[6]>>>16)|0,t[1]=dt[1]+(dt[0]<<8|dt[0]>>>24)+dt[7]|0,t[2]=dt[2]+(dt[1]<<16|dt[1]>>>16)+(dt[0]<<16|dt[0]>>>16)|0,t[3]=dt[3]+(dt[2]<<8|dt[2]>>>24)+dt[1]|0,t[4]=dt[4]+(dt[3]<<16|dt[3]>>>16)+(dt[2]<<16|dt[2]>>>16)|0,t[5]=dt[5]+(dt[4]<<8|dt[4]>>>24)+dt[3]|0,t[6]=dt[6]+(dt[5]<<16|dt[5]>>>16)+(dt[4]<<16|dt[4]>>>16)|0,t[7]=dt[7]+(dt[6]<<8|dt[6]>>>24)+dt[5]|0}function Mt(){for(var t=this._X,e=this._C,r=0;r<8;r++)wt[r]=e[r];e[0]=e[0]+1295307597+this._b|0,e[1]=e[1]+3545052371+(e[0]>>>0<wt[0]>>>0?1:0)|0,e[2]=e[2]+886263092+(e[1]>>>0<wt[1]>>>0?1:0)|0,e[3]=e[3]+1295307597+(e[2]>>>0<wt[2]>>>0?1:0)|0,e[4]=e[4]+3545052371+(e[3]>>>0<wt[3]>>>0?1:0)|0,e[5]=e[5]+886263092+(e[4]>>>0<wt[4]>>>0?1:0)|0,e[6]=e[6]+1295307597+(e[5]>>>0<wt[5]>>>0?1:0)|0,e[7]=e[7]+3545052371+(e[6]>>>0<wt[6]>>>0?1:0)|0,this._b=e[7]>>>0<wt[7]>>>0?1:0;for(r=0;r<8;r++){var i=t[r]+e[r],n=65535&i,o=i>>>16,s=((n*n>>>17)+n*o>>>15)+o*o,c=((4294901760&i)*i|0)+((65535&i)*i|0);kt[r]=s^c}t[0]=kt[0]+(kt[7]<<16|kt[7]>>>16)+(kt[6]<<16|kt[6]>>>16)|0,t[1]=kt[1]+(kt[0]<<8|kt[0]>>>24)+kt[7]|0,t[2]=kt[2]+(kt[1]<<16|kt[1]>>>16)+(kt[0]<<16|kt[0]>>>16)|0,t[3]=kt[3]+(kt[2]<<8|kt[2]>>>24)+kt[1]|0,t[4]=kt[4]+(kt[3]<<16|kt[3]>>>16)+(kt[2]<<16|kt[2]>>>16)|0,t[5]=kt[5]+(kt[4]<<8|kt[4]>>>24)+kt[3]|0,t[6]=kt[6]+(kt[5]<<16|kt[5]>>>16)+(kt[4]<<16|kt[4]>>>16)|0,t[7]=kt[7]+(kt[6]<<8|kt[6]>>>24)+kt[5]|0}return h=bt.lib.WordArray,bt.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,i=this._map;t.clamp();for(var n=[],o=0;o<r;o+=3)for(var s=(e[o>>>2]>>>24-o%4*8&255)<<16|(e[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|e[o+2>>>2]>>>24-(o+2)%4*8&255,c=0;c<4&&o+.75*c<r;c++)n.push(i.charAt(s>>>6*(3-c)&63));var a=i.charAt(64);if(a)for(;n.length%4;)n.push(a);return n.join("")},parse:function(t){var e=t.length,r=this._map,i=this._reverseMap;if(!i){i=this._reverseMap=[];for(var n=0;n<r.length;n++)i[r.charCodeAt(n)]=n}var o=r.charAt(64);if(o){var s=t.indexOf(o);-1!==s&&(e=s)}return function(t,e,r){for(var i=[],n=0,o=0;o<e;o++)if(o%4){var s=r[t.charCodeAt(o-1)]<<o%4*2,c=r[t.charCodeAt(o)]>>>6-o%4*2,a=s|c;i[n>>>2]|=a<<24-n%4*8,n++}return h.create(i,n)}(t,e,i)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},function(l){var t=bt,e=t.lib,r=e.WordArray,i=e.Hasher,n=t.algo,H=[];!function(){for(var t=0;t<64;t++)H[t]=4294967296*l.abs(l.sin(t+1))|0}();var o=n.MD5=i.extend({_doReset:function(){this._hash=new r.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,e){for(var r=0;r<16;r++){var i=e+r,n=t[i];t[i]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8)}var o=this._hash.words,s=t[e+0],c=t[e+1],a=t[e+2],h=t[e+3],l=t[e+4],f=t[e+5],d=t[e+6],u=t[e+7],p=t[e+8],_=t[e+9],v=t[e+10],y=t[e+11],g=t[e+12],B=t[e+13],w=t[e+14],k=t[e+15],S=o[0],m=o[1],x=o[2],b=o[3];S=z(S,m,x,b,s,7,H[0]),b=z(b,S,m,x,c,12,H[1]),x=z(x,b,S,m,a,17,H[2]),m=z(m,x,b,S,h,22,H[3]),S=z(S,m,x,b,l,7,H[4]),b=z(b,S,m,x,f,12,H[5]),x=z(x,b,S,m,d,17,H[6]),m=z(m,x,b,S,u,22,H[7]),S=z(S,m,x,b,p,7,H[8]),b=z(b,S,m,x,_,12,H[9]),x=z(x,b,S,m,v,17,H[10]),m=z(m,x,b,S,y,22,H[11]),S=z(S,m,x,b,g,7,H[12]),b=z(b,S,m,x,B,12,H[13]),x=z(x,b,S,m,w,17,H[14]),S=A(S,m=z(m,x,b,S,k,22,H[15]),x,b,c,5,H[16]),b=A(b,S,m,x,d,9,H[17]),x=A(x,b,S,m,y,14,H[18]),m=A(m,x,b,S,s,20,H[19]),S=A(S,m,x,b,f,5,H[20]),b=A(b,S,m,x,v,9,H[21]),x=A(x,b,S,m,k,14,H[22]),m=A(m,x,b,S,l,20,H[23]),S=A(S,m,x,b,_,5,H[24]),b=A(b,S,m,x,w,9,H[25]),x=A(x,b,S,m,h,14,H[26]),m=A(m,x,b,S,p,20,H[27]),S=A(S,m,x,b,B,5,H[28]),b=A(b,S,m,x,a,9,H[29]),x=A(x,b,S,m,u,14,H[30]),S=C(S,m=A(m,x,b,S,g,20,H[31]),x,b,f,4,H[32]),b=C(b,S,m,x,p,11,H[33]),x=C(x,b,S,m,y,16,H[34]),m=C(m,x,b,S,w,23,H[35]),S=C(S,m,x,b,c,4,H[36]),b=C(b,S,m,x,l,11,H[37]),x=C(x,b,S,m,u,16,H[38]),m=C(m,x,b,S,v,23,H[39]),S=C(S,m,x,b,B,4,H[40]),b=C(b,S,m,x,s,11,H[41]),x=C(x,b,S,m,h,16,H[42]),m=C(m,x,b,S,d,23,H[43]),S=C(S,m,x,b,_,4,H[44]),b=C(b,S,m,x,g,11,H[45]),x=C(x,b,S,m,k,16,H[46]),S=D(S,m=C(m,x,b,S,a,23,H[47]),x,b,s,6,H[48]),b=D(b,S,m,x,u,10,H[49]),x=D(x,b,S,m,w,15,H[50]),m=D(m,x,b,S,f,21,H[51]),S=D(S,m,x,b,g,6,H[52]),b=D(b,S,m,x,h,10,H[53]),x=D(x,b,S,m,v,15,H[54]),m=D(m,x,b,S,c,21,H[55]),S=D(S,m,x,b,p,6,H[56]),b=D(b,S,m,x,k,10,H[57]),x=D(x,b,S,m,d,15,H[58]),m=D(m,x,b,S,B,21,H[59]),S=D(S,m,x,b,l,6,H[60]),b=D(b,S,m,x,y,10,H[61]),x=D(x,b,S,m,a,15,H[62]),m=D(m,x,b,S,_,21,H[63]),o[0]=o[0]+S|0,o[1]=o[1]+m|0,o[2]=o[2]+x|0,o[3]=o[3]+b|0},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;e[i>>>5]|=128<<24-i%32;var n=l.floor(r/4294967296),o=r;e[15+(64+i>>>9<<4)]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8),e[14+(64+i>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),t.sigBytes=4*(e.length+1),this._process();for(var s=this._hash,c=s.words,a=0;a<4;a++){var h=c[a];c[a]=16711935&(h<<8|h>>>24)|4278255360&(h<<24|h>>>8)}return s},clone:function(){var t=i.clone.call(this);return t._hash=this._hash.clone(),t}});function z(t,e,r,i,n,o,s){var c=t+(e&r|~e&i)+n+s;return(c<<o|c>>>32-o)+e}function A(t,e,r,i,n,o,s){var c=t+(e&i|r&~i)+n+s;return(c<<o|c>>>32-o)+e}function C(t,e,r,i,n,o,s){var c=t+(e^r^i)+n+s;return(c<<o|c>>>32-o)+e}function D(t,e,r,i,n,o,s){var c=t+(r^(e|~i))+n+s;return(c<<o|c>>>32-o)+e}t.MD5=i._createHelper(o),t.HmacMD5=i._createHmacHelper(o)}(Math),e=(t=bt).lib,r=e.WordArray,i=e.Hasher,n=t.algo,f=[],o=n.SHA1=i.extend({_doReset:function(){this._hash=new r.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var r=this._hash.words,i=r[0],n=r[1],o=r[2],s=r[3],c=r[4],a=0;a<80;a++){if(a<16)f[a]=0|t[e+a];else{var h=f[a-3]^f[a-8]^f[a-14]^f[a-16];f[a]=h<<1|h>>>31}var l=(i<<5|i>>>27)+c+f[a];l+=a<20?1518500249+(n&o|~n&s):a<40?1859775393+(n^o^s):a<60?(n&o|n&s|o&s)-1894007588:(n^o^s)-899497514,c=s,s=o,o=n<<30|n>>>2,n=i,i=l}r[0]=r[0]+i|0,r[1]=r[1]+n|0,r[2]=r[2]+o|0,r[3]=r[3]+s|0,r[4]=r[4]+c|0},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return e[i>>>5]|=128<<24-i%32,e[14+(64+i>>>9<<4)]=Math.floor(r/4294967296),e[15+(64+i>>>9<<4)]=r,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=i.clone.call(this);return t._hash=this._hash.clone(),t}}),t.SHA1=i._createHelper(o),t.HmacSHA1=i._createHmacHelper(o),function(n){var t=bt,e=t.lib,r=e.WordArray,i=e.Hasher,o=t.algo,s=[],B=[];!function(){function t(t){for(var e=n.sqrt(t),r=2;r<=e;r++)if(!(t%r))return;return 1}function e(t){return 4294967296*(t-(0|t))|0}for(var r=2,i=0;i<64;)t(r)&&(i<8&&(s[i]=e(n.pow(r,.5))),B[i]=e(n.pow(r,1/3)),i++),r++}();var w=[],c=o.SHA256=i.extend({_doReset:function(){this._hash=new r.init(s.slice(0))},_doProcessBlock:function(t,e){for(var r=this._hash.words,i=r[0],n=r[1],o=r[2],s=r[3],c=r[4],a=r[5],h=r[6],l=r[7],f=0;f<64;f++){if(f<16)w[f]=0|t[e+f];else{var d=w[f-15],u=(d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3,p=w[f-2],_=(p<<15|p>>>17)^(p<<13|p>>>19)^p>>>10;w[f]=u+w[f-7]+_+w[f-16]}var v=i&n^i&o^n&o,y=(i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22),g=l+((c<<26|c>>>6)^(c<<21|c>>>11)^(c<<7|c>>>25))+(c&a^~c&h)+B[f]+w[f];l=h,h=a,a=c,c=s+g|0,s=o,o=n,n=i,i=g+(y+v)|0}r[0]=r[0]+i|0,r[1]=r[1]+n|0,r[2]=r[2]+o|0,r[3]=r[3]+s|0,r[4]=r[4]+c|0,r[5]=r[5]+a|0,r[6]=r[6]+h|0,r[7]=r[7]+l|0},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return e[i>>>5]|=128<<24-i%32,e[14+(64+i>>>9<<4)]=n.floor(r/4294967296),e[15+(64+i>>>9<<4)]=r,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=i.clone.call(this);return t._hash=this._hash.clone(),t}});t.SHA256=i._createHelper(c),t.HmacSHA256=i._createHmacHelper(c)}(Math),function(){var n=bt.lib.WordArray,t=bt.enc;t.Utf16=t.Utf16BE={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n+=2){var o=e[n>>>2]>>>16-n%4*8&65535;i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>1]|=t.charCodeAt(i)<<16-i%2*16;return n.create(r,2*e)}};function s(t){return t<<8&4278255360|t>>>8&16711935}t.Utf16LE={stringify:function(t){for(var e=t.words,r=t.sigBytes,i=[],n=0;n<r;n+=2){var o=s(e[n>>>2]>>>16-n%4*8&65535);i.push(String.fromCharCode(o))}return i.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>1]|=s(t.charCodeAt(i)<<16-i%2*16);return n.create(r,2*e)}}}(),function(){if("function"==typeof ArrayBuffer){var t=bt.lib.WordArray,n=t.init;(t.init=function(t){if(t instanceof ArrayBuffer&&(t=new Uint8Array(t)),(t instanceof Int8Array||"undefined"!=typeof Uint8ClampedArray&&t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array)&&(t=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),t instanceof Uint8Array){for(var e=t.byteLength,r=[],i=0;i<e;i++)r[i>>>2]|=t[i]<<24-i%4*8;n.call(this,r,e)}else n.apply(this,arguments)}).prototype=t}}(),Math,c=(s=bt).lib,a=c.WordArray,l=c.Hasher,d=s.algo,m=a.create([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13]),x=a.create([5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11]),b=a.create([11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6]),H=a.create([8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11]),z=a.create([0,1518500249,1859775393,2400959708,2840853838]),A=a.create([1352829926,1548603684,1836072691,2053994217,0]),u=d.RIPEMD160=l.extend({_doReset:function(){this._hash=a.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var r=0;r<16;r++){var i=e+r,n=t[i];t[i]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8)}var o,s,c,a,h,l,f,d,u,p,_,v=this._hash.words,y=z.words,g=A.words,B=m.words,w=x.words,k=b.words,S=H.words;l=o=v[0],f=s=v[1],d=c=v[2],u=a=v[3],p=h=v[4];for(r=0;r<80;r+=1)_=o+t[e+B[r]]|0,_+=r<16?mt(s,c,a)+y[0]:r<32?xt(s,c,a)+y[1]:r<48?Ht(s,c,a)+y[2]:r<64?zt(s,c,a)+y[3]:At(s,c,a)+y[4],_=(_=Ct(_|=0,k[r]))+h|0,o=h,h=a,a=Ct(c,10),c=s,s=_,_=l+t[e+w[r]]|0,_+=r<16?At(f,d,u)+g[0]:r<32?zt(f,d,u)+g[1]:r<48?Ht(f,d,u)+g[2]:r<64?xt(f,d,u)+g[3]:mt(f,d,u)+g[4],_=(_=Ct(_|=0,S[r]))+p|0,l=p,p=u,u=Ct(d,10),d=f,f=_;_=v[1]+c+u|0,v[1]=v[2]+a+p|0,v[2]=v[3]+h+l|0,v[3]=v[4]+o+f|0,v[4]=v[0]+s+d|0,v[0]=_},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;e[i>>>5]|=128<<24-i%32,e[14+(64+i>>>9<<4)]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),t.sigBytes=4*(e.length+1),this._process();for(var n=this._hash,o=n.words,s=0;s<5;s++){var c=o[s];o[s]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8)}return n},clone:function(){var t=l.clone.call(this);return t._hash=this._hash.clone(),t}}),s.RIPEMD160=l._createHelper(u),s.HmacRIPEMD160=l._createHmacHelper(u),p=bt.lib.Base,_=bt.enc.Utf8,bt.algo.HMAC=p.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=_.parse(e));var r=t.blockSize,i=4*r;e.sigBytes>i&&(e=t.finalize(e)),e.clamp();for(var n=this._oKey=e.clone(),o=this._iKey=e.clone(),s=n.words,c=o.words,a=0;a<r;a++)s[a]^=1549556828,c[a]^=909522486;n.sigBytes=o.sigBytes=i,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,r=e.finalize(t);return e.reset(),e.finalize(this._oKey.clone().concat(r))}}),y=(v=bt).lib,g=y.Base,B=y.WordArray,w=v.algo,k=w.SHA1,S=w.HMAC,C=w.PBKDF2=g.extend({cfg:g.extend({keySize:4,hasher:k,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var r=this.cfg,i=S.create(r.hasher,t),n=B.create(),o=B.create([1]),s=n.words,c=o.words,a=r.keySize,h=r.iterations;s.length<a;){var l=i.update(e).finalize(o);i.reset();for(var f=l.words,d=f.length,u=l,p=1;p<h;p++){u=i.finalize(u),i.reset();for(var _=u.words,v=0;v<d;v++)f[v]^=_[v]}n.concat(l),c[0]++}return n.sigBytes=4*a,n}}),v.PBKDF2=function(t,e,r){return C.create(r).compute(t,e)},E=(D=bt).lib,R=E.Base,M=E.WordArray,F=D.algo,P=F.MD5,W=F.EvpKDF=R.extend({cfg:R.extend({keySize:4,hasher:P,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var r,i=this.cfg,n=i.hasher.create(),o=M.create(),s=o.words,c=i.keySize,a=i.iterations;s.length<c;){r&&n.update(r),r=n.update(t).finalize(e),n.reset();for(var h=1;h<a;h++)r=n.finalize(r),n.reset();o.concat(r)}return o.sigBytes=4*c,o}}),D.EvpKDF=function(t,e,r){return W.create(r).compute(t,e)},I=(O=bt).lib.WordArray,U=O.algo,K=U.SHA256,X=U.SHA224=K.extend({_doReset:function(){this._hash=new I.init([3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428])},_doFinalize:function(){var t=K._doFinalize.call(this);return t.sigBytes-=4,t}}),O.SHA224=K._createHelper(X),O.HmacSHA224=K._createHmacHelper(X),L=bt.lib,j=L.Base,N=L.WordArray,(T=bt.x64={}).Word=j.extend({init:function(t,e){this.high=t,this.low=e}}),T.WordArray=j.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:8*t.length},toX32:function(){for(var t=this.words,e=t.length,r=[],i=0;i<e;i++){var n=t[i];r.push(n.high),r.push(n.low)}return N.create(r,this.sigBytes)},clone:function(){for(var t=j.clone.call(this),e=t.words=this.words.slice(0),r=e.length,i=0;i<r;i++)e[i]=e[i].clone();return t}}),function(d){var t=bt,e=t.lib,u=e.WordArray,i=e.Hasher,l=t.x64.Word,r=t.algo,C=[],D=[],E=[];!function(){for(var t=1,e=0,r=0;r<24;r++){C[t+5*e]=(r+1)*(r+2)/2%64;var i=(2*t+3*e)%5;t=e%5,e=i}for(t=0;t<5;t++)for(e=0;e<5;e++)D[t+5*e]=e+(2*t+3*e)%5*5;for(var n=1,o=0;o<24;o++){for(var s=0,c=0,a=0;a<7;a++){if(1&n){var h=(1<<a)-1;h<32?c^=1<<h:s^=1<<h-32}128&n?n=n<<1^113:n<<=1}E[o]=l.create(s,c)}}();var R=[];!function(){for(var t=0;t<25;t++)R[t]=l.create()}();var n=r.SHA3=i.extend({cfg:i.cfg.extend({outputLength:512}),_doReset:function(){for(var t=this._state=[],e=0;e<25;e++)t[e]=new l.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(t,e){for(var r=this._state,i=this.blockSize/2,n=0;n<i;n++){var o=t[e+2*n],s=t[e+2*n+1];o=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),s=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),(x=r[n]).high^=s,x.low^=o}for(var c=0;c<24;c++){for(var a=0;a<5;a++){for(var h=0,l=0,f=0;f<5;f++){h^=(x=r[a+5*f]).high,l^=x.low}var d=R[a];d.high=h,d.low=l}for(a=0;a<5;a++){var u=R[(a+4)%5],p=R[(a+1)%5],_=p.high,v=p.low;for(h=u.high^(_<<1|v>>>31),l=u.low^(v<<1|_>>>31),f=0;f<5;f++){(x=r[a+5*f]).high^=h,x.low^=l}}for(var y=1;y<25;y++){var g=(x=r[y]).high,B=x.low,w=C[y];l=w<32?(h=g<<w|B>>>32-w,B<<w|g>>>32-w):(h=B<<w-32|g>>>64-w,g<<w-32|B>>>64-w);var k=R[D[y]];k.high=h,k.low=l}var S=R[0],m=r[0];S.high=m.high,S.low=m.low;for(a=0;a<5;a++)for(f=0;f<5;f++){var x=r[y=a+5*f],b=R[y],H=R[(a+1)%5+5*f],z=R[(a+2)%5+5*f];x.high=b.high^~H.high&z.high,x.low=b.low^~H.low&z.low}x=r[0];var A=E[c];x.high^=A.high,x.low^=A.low}},_doFinalize:function(){var t=this._data,e=t.words,r=(this._nDataBytes,8*t.sigBytes),i=32*this.blockSize;e[r>>>5]|=1<<24-r%32,e[(d.ceil((1+r)/i)*i>>>5)-1]|=128,t.sigBytes=4*e.length,this._process();for(var n=this._state,o=this.cfg.outputLength/8,s=o/8,c=[],a=0;a<s;a++){var h=n[a],l=h.high,f=h.low;l=16711935&(l<<8|l>>>24)|4278255360&(l<<24|l>>>8),f=16711935&(f<<8|f>>>24)|4278255360&(f<<24|f>>>8),c.push(f),c.push(l)}return new u.init(c,o)},clone:function(){for(var t=i.clone.call(this),e=t._state=this._state.slice(0),r=0;r<25;r++)e[r]=e[r].clone();return t}});t.SHA3=i._createHelper(n),t.HmacSHA3=i._createHmacHelper(n)}(Math),function(){var t=bt,e=t.lib.Hasher,r=t.x64,i=r.Word,n=r.WordArray,o=t.algo;function s(){return i.create.apply(i,arguments)}var mt=[s(1116352408,3609767458),s(1899447441,602891725),s(3049323471,3964484399),s(3921009573,2173295548),s(961987163,4081628472),s(1508970993,3053834265),s(2453635748,2937671579),s(2870763221,3664609560),s(3624381080,2734883394),s(310598401,1164996542),s(607225278,1323610764),s(1426881987,3590304994),s(1925078388,4068182383),s(2162078206,991336113),s(2614888103,633803317),s(3248222580,3479774868),s(3835390401,2666613458),s(4022224774,944711139),s(264347078,2341262773),s(604807628,2007800933),s(770255983,1495990901),s(1249150122,1856431235),s(1555081692,3175218132),s(1996064986,2198950837),s(2554220882,3999719339),s(2821834349,766784016),s(2952996808,2566594879),s(3210313671,3203337956),s(3336571891,1034457026),s(3584528711,2466948901),s(113926993,3758326383),s(338241895,168717936),s(666307205,1188179964),s(773529912,1546045734),s(1294757372,1522805485),s(1396182291,2643833823),s(1695183700,2343527390),s(1986661051,1014477480),s(2177026350,1206759142),s(2456956037,344077627),s(2730485921,1290863460),s(2820302411,3158454273),s(3259730800,3505952657),s(3345764771,106217008),s(3516065817,3606008344),s(3600352804,1432725776),s(4094571909,1467031594),s(275423344,851169720),s(430227734,3100823752),s(506948616,1363258195),s(659060556,3750685593),s(883997877,3785050280),s(958139571,3318307427),s(1322822218,3812723403),s(1537002063,2003034995),s(1747873779,3602036899),s(1955562222,1575990012),s(2024104815,1125592928),s(2227730452,2716904306),s(2361852424,442776044),s(2428436474,593698344),s(2756734187,3733110249),s(3204031479,2999351573),s(3329325298,3815920427),s(3391569614,3928383900),s(3515267271,566280711),s(3940187606,3454069534),s(4118630271,4000239992),s(116418474,1914138554),s(174292421,2731055270),s(289380356,3203993006),s(460393269,320620315),s(685471733,587496836),s(852142971,1086792851),s(1017036298,365543100),s(1126000580,2618297676),s(1288033470,3409855158),s(1501505948,4234509866),s(1607167915,987167468),s(1816402316,1246189591)],xt=[];!function(){for(var t=0;t<80;t++)xt[t]=s()}();var c=o.SHA512=e.extend({_doReset:function(){this._hash=new n.init([new i.init(1779033703,4089235720),new i.init(3144134277,2227873595),new i.init(1013904242,4271175723),new i.init(2773480762,1595750129),new i.init(1359893119,2917565137),new i.init(2600822924,725511199),new i.init(528734635,4215389547),new i.init(1541459225,327033209)])},_doProcessBlock:function(t,e){for(var r=this._hash.words,i=r[0],n=r[1],o=r[2],s=r[3],c=r[4],a=r[5],h=r[6],l=r[7],f=i.high,d=i.low,u=n.high,p=n.low,_=o.high,v=o.low,y=s.high,g=s.low,B=c.high,w=c.low,k=a.high,S=a.low,m=h.high,x=h.low,b=l.high,H=l.low,z=f,A=d,C=u,D=p,E=_,R=v,M=y,F=g,P=B,W=w,O=k,I=S,U=m,K=x,X=b,L=H,j=0;j<80;j++){var N,T,q=xt[j];if(j<16)T=q.high=0|t[e+2*j],N=q.low=0|t[e+2*j+1];else{var Z=xt[j-15],V=Z.high,G=Z.low,J=(V>>>1|G<<31)^(V>>>8|G<<24)^V>>>7,$=(G>>>1|V<<31)^(G>>>8|V<<24)^(G>>>7|V<<25),Q=xt[j-2],Y=Q.high,tt=Q.low,et=(Y>>>19|tt<<13)^(Y<<3|tt>>>29)^Y>>>6,rt=(tt>>>19|Y<<13)^(tt<<3|Y>>>29)^(tt>>>6|Y<<26),it=xt[j-7],nt=it.high,ot=it.low,st=xt[j-16],ct=st.high,at=st.low;T=(T=(T=J+nt+((N=$+ot)>>>0<$>>>0?1:0))+et+((N+=rt)>>>0<rt>>>0?1:0))+ct+((N+=at)>>>0<at>>>0?1:0),q.high=T,q.low=N}var ht,lt=P&O^~P&U,ft=W&I^~W&K,dt=z&C^z&E^C&E,ut=A&D^A&R^D&R,pt=(z>>>28|A<<4)^(z<<30|A>>>2)^(z<<25|A>>>7),_t=(A>>>28|z<<4)^(A<<30|z>>>2)^(A<<25|z>>>7),vt=(P>>>14|W<<18)^(P>>>18|W<<14)^(P<<23|W>>>9),yt=(W>>>14|P<<18)^(W>>>18|P<<14)^(W<<23|P>>>9),gt=mt[j],Bt=gt.high,wt=gt.low,kt=X+vt+((ht=L+yt)>>>0<L>>>0?1:0),St=_t+ut;X=U,L=K,U=O,K=I,O=P,I=W,P=M+(kt=(kt=(kt=kt+lt+((ht=ht+ft)>>>0<ft>>>0?1:0))+Bt+((ht=ht+wt)>>>0<wt>>>0?1:0))+T+((ht=ht+N)>>>0<N>>>0?1:0))+((W=F+ht|0)>>>0<F>>>0?1:0)|0,M=E,F=R,E=C,R=D,C=z,D=A,z=kt+(pt+dt+(St>>>0<_t>>>0?1:0))+((A=ht+St|0)>>>0<ht>>>0?1:0)|0}d=i.low=d+A,i.high=f+z+(d>>>0<A>>>0?1:0),p=n.low=p+D,n.high=u+C+(p>>>0<D>>>0?1:0),v=o.low=v+R,o.high=_+E+(v>>>0<R>>>0?1:0),g=s.low=g+F,s.high=y+M+(g>>>0<F>>>0?1:0),w=c.low=w+W,c.high=B+P+(w>>>0<W>>>0?1:0),S=a.low=S+I,a.high=k+O+(S>>>0<I>>>0?1:0),x=h.low=x+K,h.high=m+U+(x>>>0<K>>>0?1:0),H=l.low=H+L,l.high=b+X+(H>>>0<L>>>0?1:0)},_doFinalize:function(){var t=this._data,e=t.words,r=8*this._nDataBytes,i=8*t.sigBytes;return e[i>>>5]|=128<<24-i%32,e[30+(128+i>>>10<<5)]=Math.floor(r/4294967296),e[31+(128+i>>>10<<5)]=r,t.sigBytes=4*e.length,this._process(),this._hash.toX32()},clone:function(){var t=e.clone.call(this);return t._hash=this._hash.clone(),t},blockSize:32});t.SHA512=e._createHelper(c),t.HmacSHA512=e._createHmacHelper(c)}(),Z=(q=bt).x64,V=Z.Word,G=Z.WordArray,J=q.algo,$=J.SHA512,Q=J.SHA384=$.extend({_doReset:function(){this._hash=new G.init([new V.init(3418070365,3238371032),new V.init(1654270250,914150663),new V.init(2438529370,812702999),new V.init(355462360,4144912697),new V.init(1731405415,4290775857),new V.init(2394180231,1750603025),new V.init(3675008525,1694076839),new V.init(1203062813,3204075428)])},_doFinalize:function(){var t=$._doFinalize.call(this);return t.sigBytes-=16,t}}),q.SHA384=$._createHelper(Q),q.HmacSHA384=$._createHmacHelper(Q),bt.lib.Cipher||function(){var t=bt,e=t.lib,r=e.Base,a=e.WordArray,i=e.BufferedBlockAlgorithm,n=t.enc,o=(n.Utf8,n.Base64),s=t.algo.EvpKDF,c=e.Cipher=i.extend({cfg:r.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,r){this.cfg=this.cfg.extend(r),this._xformMode=t,this._key=e,this.reset()},reset:function(){i.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(i){return{encrypt:function(t,e,r){return h(e).encrypt(i,t,e,r)},decrypt:function(t,e,r){return h(e).decrypt(i,t,e,r)}}}});function h(t){return"string"==typeof t?w:g}e.StreamCipher=c.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var l,f=t.mode={},d=e.BlockCipherMode=r.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}}),u=f.CBC=((l=d.extend()).Encryptor=l.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize;p.call(this,t,e,i),r.encryptBlock(t,e),this._prevBlock=t.slice(e,e+i)}}),l.Decryptor=l.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,n=t.slice(e,e+i);r.decryptBlock(t,e),p.call(this,t,e,i),this._prevBlock=n}}),l);function p(t,e,r){var i,n=this._iv;n?(i=n,this._iv=void 0):i=this._prevBlock;for(var o=0;o<r;o++)t[e+o]^=i[o]}var _=(t.pad={}).Pkcs7={pad:function(t,e){for(var r=4*e,i=r-t.sigBytes%r,n=i<<24|i<<16|i<<8|i,o=[],s=0;s<i;s+=4)o.push(n);var c=a.create(o,i);t.concat(c)},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},v=(e.BlockCipher=c.extend({cfg:c.cfg.extend({mode:u,padding:_}),reset:function(){var t;c.reset.call(this);var e=this.cfg,r=e.iv,i=e.mode;this._xformMode==this._ENC_XFORM_MODE?t=i.createEncryptor:(t=i.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==t?this._mode.init(this,r&&r.words):(this._mode=t.call(i,this,r&&r.words),this._mode.__creator=t)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t,e=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(e.pad(this._data,this.blockSize),t=this._process(!0)):(t=this._process(!0),e.unpad(t)),t},blockSize:4}),e.CipherParams=r.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}})),y=(t.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext,r=t.salt;return(r?a.create([1398893684,1701076831]).concat(r).concat(e):e).toString(o)},parse:function(t){var e,r=o.parse(t),i=r.words;return 1398893684==i[0]&&1701076831==i[1]&&(e=a.create(i.slice(2,4)),i.splice(0,4),r.sigBytes-=16),v.create({ciphertext:r,salt:e})}},g=e.SerializableCipher=r.extend({cfg:r.extend({format:y}),encrypt:function(t,e,r,i){i=this.cfg.extend(i);var n=t.createEncryptor(r,i),o=n.finalize(e),s=n.cfg;return v.create({ciphertext:o,key:r,iv:s.iv,algorithm:t,mode:s.mode,padding:s.padding,blockSize:t.blockSize,formatter:i.format})},decrypt:function(t,e,r,i){return i=this.cfg.extend(i),e=this._parse(e,i.format),t.createDecryptor(r,i).finalize(e.ciphertext)},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),B=(t.kdf={}).OpenSSL={execute:function(t,e,r,i){i=i||a.random(8);var n=s.create({keySize:e+r}).compute(t,i),o=a.create(n.words.slice(e),4*r);return n.sigBytes=4*e,v.create({key:n,iv:o,salt:i})}},w=e.PasswordBasedCipher=g.extend({cfg:g.cfg.extend({kdf:B}),encrypt:function(t,e,r,i){var n=(i=this.cfg.extend(i)).kdf.execute(r,t.keySize,t.ivSize);i.iv=n.iv;var o=g.encrypt.call(this,t,e,n.key,i);return o.mixIn(n),o},decrypt:function(t,e,r,i){i=this.cfg.extend(i),e=this._parse(e,i.format);var n=i.kdf.execute(r,t.keySize,t.ivSize,e.salt);return i.iv=n.iv,g.decrypt.call(this,t,e,n.key,i)}})}(),bt.mode.CFB=((Y=bt.lib.BlockCipherMode.extend()).Encryptor=Y.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize;Dt.call(this,t,e,i,r),this._prevBlock=t.slice(e,e+i)}}),Y.Decryptor=Y.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,n=t.slice(e,e+i);Dt.call(this,t,e,i,r),this._prevBlock=n}}),Y),bt.mode.ECB=((tt=bt.lib.BlockCipherMode.extend()).Encryptor=tt.extend({processBlock:function(t,e){this._cipher.encryptBlock(t,e)}}),tt.Decryptor=tt.extend({processBlock:function(t,e){this._cipher.decryptBlock(t,e)}}),tt),bt.pad.AnsiX923={pad:function(t,e){var r=t.sigBytes,i=4*e,n=i-r%i,o=r+n-1;t.clamp(),t.words[o>>>2]|=n<<24-o%4*8,t.sigBytes+=n},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},bt.pad.Iso10126={pad:function(t,e){var r=4*e,i=r-t.sigBytes%r;t.concat(bt.lib.WordArray.random(i-1)).concat(bt.lib.WordArray.create([i<<24],1))},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},bt.pad.Iso97971={pad:function(t,e){t.concat(bt.lib.WordArray.create([2147483648],1)),bt.pad.ZeroPadding.pad(t,e)},unpad:function(t){bt.pad.ZeroPadding.unpad(t),t.sigBytes--}},bt.mode.OFB=(et=bt.lib.BlockCipherMode.extend(),rt=et.Encryptor=et.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,n=this._iv,o=this._keystream;n&&(o=this._keystream=n.slice(0),this._iv=void 0),r.encryptBlock(o,0);for(var s=0;s<i;s++)t[e+s]^=o[s]}}),et.Decryptor=rt,et),bt.pad.NoPadding={pad:function(){},unpad:function(){}},it=bt.lib.CipherParams,nt=bt.enc.Hex,bt.format.Hex={stringify:function(t){return t.ciphertext.toString(nt)},parse:function(t){var e=nt.parse(t);return it.create({ciphertext:e})}},function(){var t=bt,e=t.lib.BlockCipher,r=t.algo,h=[],l=[],f=[],d=[],u=[],p=[],_=[],v=[],y=[],g=[];!function(){for(var t=[],e=0;e<256;e++)t[e]=e<128?e<<1:e<<1^283;var r=0,i=0;for(e=0;e<256;e++){var n=i^i<<1^i<<2^i<<3^i<<4;n=n>>>8^255&n^99,h[r]=n;var o=t[l[n]=r],s=t[o],c=t[s],a=257*t[n]^16843008*n;f[r]=a<<24|a>>>8,d[r]=a<<16|a>>>16,u[r]=a<<8|a>>>24,p[r]=a;a=16843009*c^65537*s^257*o^16843008*r;_[n]=a<<24|a>>>8,v[n]=a<<16|a>>>16,y[n]=a<<8|a>>>24,g[n]=a,r?(r=o^t[t[t[c^o]]],i^=t[t[i]]):r=i=1}}();var B=[0,1,2,4,8,16,32,64,128,27,54],i=r.AES=e.extend({_doReset:function(){if(!this._nRounds||this._keyPriorReset!==this._key){for(var t=this._keyPriorReset=this._key,e=t.words,r=t.sigBytes/4,i=4*(1+(this._nRounds=6+r)),n=this._keySchedule=[],o=0;o<i;o++)o<r?n[o]=e[o]:(a=n[o-1],o%r?6<r&&o%r==4&&(a=h[a>>>24]<<24|h[a>>>16&255]<<16|h[a>>>8&255]<<8|h[255&a]):(a=h[(a=a<<8|a>>>24)>>>24]<<24|h[a>>>16&255]<<16|h[a>>>8&255]<<8|h[255&a],a^=B[o/r|0]<<24),n[o]=n[o-r]^a);for(var s=this._invKeySchedule=[],c=0;c<i;c++){o=i-c;if(c%4)var a=n[o];else a=n[o-4];s[c]=c<4||o<=4?a:_[h[a>>>24]]^v[h[a>>>16&255]]^y[h[a>>>8&255]]^g[h[255&a]]}}},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,f,d,u,p,h)},decryptBlock:function(t,e){var r=t[e+1];t[e+1]=t[e+3],t[e+3]=r,this._doCryptBlock(t,e,this._invKeySchedule,_,v,y,g,l);r=t[e+1];t[e+1]=t[e+3],t[e+3]=r},_doCryptBlock:function(t,e,r,i,n,o,s,c){for(var a=this._nRounds,h=t[e]^r[0],l=t[e+1]^r[1],f=t[e+2]^r[2],d=t[e+3]^r[3],u=4,p=1;p<a;p++){var _=i[h>>>24]^n[l>>>16&255]^o[f>>>8&255]^s[255&d]^r[u++],v=i[l>>>24]^n[f>>>16&255]^o[d>>>8&255]^s[255&h]^r[u++],y=i[f>>>24]^n[d>>>16&255]^o[h>>>8&255]^s[255&l]^r[u++],g=i[d>>>24]^n[h>>>16&255]^o[l>>>8&255]^s[255&f]^r[u++];h=_,l=v,f=y,d=g}_=(c[h>>>24]<<24|c[l>>>16&255]<<16|c[f>>>8&255]<<8|c[255&d])^r[u++],v=(c[l>>>24]<<24|c[f>>>16&255]<<16|c[d>>>8&255]<<8|c[255&h])^r[u++],y=(c[f>>>24]<<24|c[d>>>16&255]<<16|c[h>>>8&255]<<8|c[255&l])^r[u++],g=(c[d>>>24]<<24|c[h>>>16&255]<<16|c[l>>>8&255]<<8|c[255&f])^r[u++];t[e]=_,t[e+1]=v,t[e+2]=y,t[e+3]=g},keySize:8});t.AES=e._createHelper(i)}(),function(){var t=bt,e=t.lib,n=e.WordArray,r=e.BlockCipher,i=t.algo,h=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],l=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],f=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],d=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],u=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],o=i.DES=r.extend({_doReset:function(){for(var t=this._key.words,e=[],r=0;r<56;r++){var i=h[r]-1;e[r]=t[i>>>5]>>>31-i%32&1}for(var n=this._subKeys=[],o=0;o<16;o++){var s=n[o]=[],c=f[o];for(r=0;r<24;r++)s[r/6|0]|=e[(l[r]-1+c)%28]<<31-r%6,s[4+(r/6|0)]|=e[28+(l[r+24]-1+c)%28]<<31-r%6;s[0]=s[0]<<1|s[0]>>>31;for(r=1;r<7;r++)s[r]=s[r]>>>4*(r-1)+3;s[7]=s[7]<<5|s[7]>>>27}var a=this._invSubKeys=[];for(r=0;r<16;r++)a[r]=n[15-r]},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._subKeys)},decryptBlock:function(t,e){this._doCryptBlock(t,e,this._invSubKeys)},_doCryptBlock:function(t,e,r){this._lBlock=t[e],this._rBlock=t[e+1],p.call(this,4,252645135),p.call(this,16,65535),_.call(this,2,858993459),_.call(this,8,16711935),p.call(this,1,1431655765);for(var i=0;i<16;i++){for(var n=r[i],o=this._lBlock,s=this._rBlock,c=0,a=0;a<8;a++)c|=d[a][((s^n[a])&u[a])>>>0];this._lBlock=s,this._rBlock=o^c}var h=this._lBlock;this._lBlock=this._rBlock,this._rBlock=h,p.call(this,1,1431655765),_.call(this,8,16711935),_.call(this,2,858993459),p.call(this,16,65535),p.call(this,4,252645135),t[e]=this._lBlock,t[e+1]=this._rBlock},keySize:2,ivSize:2,blockSize:2});function p(t,e){var r=(this._lBlock>>>t^this._rBlock)&e;this._rBlock^=r,this._lBlock^=r<<t}function _(t,e){var r=(this._rBlock>>>t^this._lBlock)&e;this._lBlock^=r,this._rBlock^=r<<t}t.DES=r._createHelper(o);var s=i.TripleDES=r.extend({_doReset:function(){var t=this._key.words;if(2!==t.length&&4!==t.length&&t.length<6)throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");var e=t.slice(0,2),r=t.length<4?t.slice(0,2):t.slice(2,4),i=t.length<6?t.slice(0,2):t.slice(4,6);this._des1=o.createEncryptor(n.create(e)),this._des2=o.createEncryptor(n.create(r)),this._des3=o.createEncryptor(n.create(i))},encryptBlock:function(t,e){this._des1.encryptBlock(t,e),this._des2.decryptBlock(t,e),this._des3.encryptBlock(t,e)},decryptBlock:function(t,e){this._des3.decryptBlock(t,e),this._des2.encryptBlock(t,e),this._des1.decryptBlock(t,e)},keySize:6,ivSize:2,blockSize:2});t.TripleDES=r._createHelper(s)}(),function(){var t=bt,e=t.lib.StreamCipher,r=t.algo,i=r.RC4=e.extend({_doReset:function(){for(var t=this._key,e=t.words,r=t.sigBytes,i=this._S=[],n=0;n<256;n++)i[n]=n;n=0;for(var o=0;n<256;n++){var s=n%r,c=e[s>>>2]>>>24-s%4*8&255;o=(o+i[n]+c)%256;var a=i[n];i[n]=i[o],i[o]=a}this._i=this._j=0},_doProcessBlock:function(t,e){t[e]^=n.call(this)},keySize:8,ivSize:0});function n(){for(var t=this._S,e=this._i,r=this._j,i=0,n=0;n<4;n++){r=(r+t[e=(e+1)%256])%256;var o=t[e];t[e]=t[r],t[r]=o,i|=t[(t[e]+t[r])%256]<<24-8*n}return this._i=e,this._j=r,i}t.RC4=e._createHelper(i);var o=r.RC4Drop=i.extend({cfg:i.cfg.extend({drop:192}),_doReset:function(){i._doReset.call(this);for(var t=this.cfg.drop;0<t;t--)n.call(this)}});t.RC4Drop=e._createHelper(o)}(),bt.mode.CTRGladman=(ot=bt.lib.BlockCipherMode.extend(),st=ot.Encryptor=ot.extend({processBlock:function(t,e){var r,i=this._cipher,n=i.blockSize,o=this._iv,s=this._counter;o&&(s=this._counter=o.slice(0),this._iv=void 0),0===((r=s)[0]=Et(r[0]))&&(r[1]=Et(r[1]));var c=s.slice(0);i.encryptBlock(c,0);for(var a=0;a<n;a++)t[e+a]^=c[a]}}),ot.Decryptor=st,ot),at=(ct=bt).lib.StreamCipher,ht=ct.algo,lt=[],ft=[],dt=[],ut=ht.Rabbit=at.extend({_doReset:function(){for(var t=this._key.words,e=this.cfg.iv,r=0;r<4;r++)t[r]=16711935&(t[r]<<8|t[r]>>>24)|4278255360&(t[r]<<24|t[r]>>>8);var i=this._X=[t[0],t[3]<<16|t[2]>>>16,t[1],t[0]<<16|t[3]>>>16,t[2],t[1]<<16|t[0]>>>16,t[3],t[2]<<16|t[1]>>>16],n=this._C=[t[2]<<16|t[2]>>>16,4294901760&t[0]|65535&t[1],t[3]<<16|t[3]>>>16,4294901760&t[1]|65535&t[2],t[0]<<16|t[0]>>>16,4294901760&t[2]|65535&t[3],t[1]<<16|t[1]>>>16,4294901760&t[3]|65535&t[0]];for(r=this._b=0;r<4;r++)Rt.call(this);for(r=0;r<8;r++)n[r]^=i[r+4&7];if(e){var o=e.words,s=o[0],c=o[1],a=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),h=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8),l=a>>>16|4294901760&h,f=h<<16|65535&a;n[0]^=a,n[1]^=l,n[2]^=h,n[3]^=f,n[4]^=a,n[5]^=l,n[6]^=h,n[7]^=f;for(r=0;r<4;r++)Rt.call(this)}},_doProcessBlock:function(t,e){var r=this._X;Rt.call(this),lt[0]=r[0]^r[5]>>>16^r[3]<<16,lt[1]=r[2]^r[7]>>>16^r[5]<<16,lt[2]=r[4]^r[1]>>>16^r[7]<<16,lt[3]=r[6]^r[3]>>>16^r[1]<<16;for(var i=0;i<4;i++)lt[i]=16711935&(lt[i]<<8|lt[i]>>>24)|4278255360&(lt[i]<<24|lt[i]>>>8),t[e+i]^=lt[i]},blockSize:4,ivSize:2}),ct.Rabbit=at._createHelper(ut),bt.mode.CTR=(pt=bt.lib.BlockCipherMode.extend(),_t=pt.Encryptor=pt.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,n=this._iv,o=this._counter;n&&(o=this._counter=n.slice(0),this._iv=void 0);var s=o.slice(0);r.encryptBlock(s,0),o[i-1]=o[i-1]+1|0;for(var c=0;c<i;c++)t[e+c]^=s[c]}}),pt.Decryptor=_t,pt),yt=(vt=bt).lib.StreamCipher,gt=vt.algo,Bt=[],wt=[],kt=[],St=gt.RabbitLegacy=yt.extend({_doReset:function(){for(var t=this._key.words,e=this.cfg.iv,r=this._X=[t[0],t[3]<<16|t[2]>>>16,t[1],t[0]<<16|t[3]>>>16,t[2],t[1]<<16|t[0]>>>16,t[3],t[2]<<16|t[1]>>>16],i=this._C=[t[2]<<16|t[2]>>>16,4294901760&t[0]|65535&t[1],t[3]<<16|t[3]>>>16,4294901760&t[1]|65535&t[2],t[0]<<16|t[0]>>>16,4294901760&t[2]|65535&t[3],t[1]<<16|t[1]>>>16,4294901760&t[3]|65535&t[0]],n=this._b=0;n<4;n++)Mt.call(this);for(n=0;n<8;n++)i[n]^=r[n+4&7];if(e){var o=e.words,s=o[0],c=o[1],a=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8),h=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8),l=a>>>16|4294901760&h,f=h<<16|65535&a;i[0]^=a,i[1]^=l,i[2]^=h,i[3]^=f,i[4]^=a,i[5]^=l,i[6]^=h,i[7]^=f;for(n=0;n<4;n++)Mt.call(this)}},_doProcessBlock:function(t,e){var r=this._X;Mt.call(this),Bt[0]=r[0]^r[5]>>>16^r[3]<<16,Bt[1]=r[2]^r[7]>>>16^r[5]<<16,Bt[2]=r[4]^r[1]>>>16^r[7]<<16,Bt[3]=r[6]^r[3]>>>16^r[1]<<16;for(var i=0;i<4;i++)Bt[i]=16711935&(Bt[i]<<8|Bt[i]>>>24)|4278255360&(Bt[i]<<24|Bt[i]>>>8),t[e+i]^=Bt[i]},blockSize:4,ivSize:2}),vt.RabbitLegacy=yt._createHelper(St),bt.pad.ZeroPadding={pad:function(t,e){var r=4*e;t.clamp(),t.sigBytes+=r-(t.sigBytes%r||r)},unpad:function(t){var e=t.words,r=t.sigBytes-1;for(r=t.sigBytes-1;0<=r;r--)if(e[r>>>2]>>>24-r%4*8&255){t.sigBytes=r+1;break}}},bt});


!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e = e || self).thinkingdata = t());
})(this, function () {
  "use strict";

  function _typeof(e) {
    return (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
          return typeof e;
        }
        : function (e) {
          return e &&
          "function" == typeof Symbol &&
          e.constructor === Symbol &&
          e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        })(e);
  }

  function _classCallCheck(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }

  function _defineProperties(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
      "value" in n && (n.writable = !0),
        Object.defineProperty(e, n.key, n);
    }
  }

  function _createClass(e, t, r) {
    return (
      t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e
    );
  }

  "object" !== ("undefined" == typeof JSON ? "undefined" : _typeof(JSON)) &&
  (JSON = {}),
    (function () {
      var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three =
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable =
          /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous =
          /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta,
        rep;

      function f(e) {
        return e < 10 ? "0" + e : e;
      }

      function this_value() {
        return this.valueOf();
      }

      function quote(e) {
        return (
          (rx_escapable.lastIndex = 0),
            rx_escapable.test(e)
              ? '"' +
              e.replace(rx_escapable, function (e) {
                var t = meta[e];
                return "string" == typeof t
                  ? t
                  : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
              }) +
              '"'
              : '"' + e + '"'
        );
      }

      function str(e, t) {
        var r,
          n,
          i,
          o,
          s,
          a = gap,
          c = t[e];
        switch (
          (c &&
          "object" === _typeof(c) &&
          "function" == typeof c.toJSON &&
          (c = c.toJSON(e)),
            _typeof((c = "function" == typeof rep ? rep.call(t, e, c) : c)))
          ) {
          case "string":
            return quote(c);
          case "number":
            return isFinite(c) ? String(c) : "null";
          case "boolean":
          case "null":
            return String(c);
          case "object":
            if (!c) return "null";
            if (
              ((gap += indent),
                (s = []),
              "[object Array]" === Object.prototype.toString.apply(c))
            ) {
              for (o = c.length, r = 0; r < o; r += 1)
                s[r] = str(r, c) || "null";
              return (
                (i =
                  0 === s.length
                    ? "[]"
                    : gap
                    ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]"
                    : "[" + s.join(",") + "]"),
                  (gap = a),
                  i
              );
            }
            if (rep && "object" === _typeof(rep))
              for (o = rep.length, r = 0; r < o; r += 1)
                "string" == typeof rep[r] &&
                (i = str((n = rep[r]), c)) &&
                s.push(quote(n) + (gap ? ": " : ":") + i);
            else
              for (n in c)
                Object.prototype.hasOwnProperty.call(c, n) &&
                (i = str(n, c)) &&
                s.push(quote(n) + (gap ? ": " : ":") + i);
            return (
              (i =
                0 === s.length
                  ? "{}"
                  : gap
                  ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}"
                  : "{" + s.join(",") + "}"),
                (gap = a),
                i
            );
        }
      }

      "function" != typeof Date.prototype.toJSON &&
      ((Date.prototype.toJSON = function () {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
          "-" +
          f(this.getUTCMonth() + 1) +
          "-" +
          f(this.getUTCDate()) +
          "T" +
          f(this.getUTCHours()) +
          ":" +
          f(this.getUTCMinutes()) +
          ":" +
          f(this.getUTCSeconds()) +
          "Z"
          : null;
      }),
        (Boolean.prototype.toJSON = this_value),
        (Number.prototype.toJSON = this_value),
        (String.prototype.toJSON = this_value)),
      "function" != typeof JSON.stringify &&
      ((meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      }),
        (JSON.stringify = function (e, t, r) {
          var n;
          if (((indent = gap = ""), "number" == typeof r))
            for (n = 0; n < r; n += 1) indent += " ";
          else "string" == typeof r && (indent = r);
          if (
            (rep = t) &&
            "function" != typeof t &&
            ("object" !== _typeof(t) || "number" != typeof t.length)
          )
            throw new Error("JSON.stringify");
          return str("", {
            "": e,
          });
        })),
      "function" != typeof JSON.parse &&
      (JSON.parse = function (text, reviver) {
        var j;

        function walk(e, t) {
          var r,
            n,
            i = e[t];
          if (i && "object" === _typeof(i))
            for (r in i)
              Object.prototype.hasOwnProperty.call(i, r) &&
              (void 0 !== (n = walk(i, r)) ? (i[r] = n) : delete i[r]);
          return reviver.call(e, t, i);
        }

        if (
          ((text = String(text)),
            (rx_dangerous.lastIndex = 0),
          rx_dangerous.test(text) &&
          (text = text.replace(rx_dangerous, function (e) {
            return (
              "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            );
          })),
            rx_one.test(
              text
                .replace(rx_two, "@")
                .replace(rx_three, "]")
                .replace(rx_four, "")
            ))
        )
          return (
            (j = eval("(" + text + ")")),
              "function" == typeof reviver
                ? walk(
                {
                  "": j,
                },
                ""
                )
                : j
          );
        throw new SyntaxError("JSON.parse");
      });
    })();
  var Config = {
      LIB_VERSION: "1.4.3",
    },
    MAX_REFERRER_STRING_LENGTH = 200,
    ArrayProto = Array.prototype,
    ObjProto = Object.prototype,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty,
    nativeForEach = ArrayProto.forEach,
    breaker = {},
    _ = {};

  function za() {
    for (var e = +new Date(), t = 0; e === +new Date();) t++;
    return e.toString(16) + t.toString(16);
  }

  function Ya() {
    return new RegExp(
      /(.*?)\.?([^\.]*?)\.(com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|net\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/
    );
  }

  function $a(e, t) {
    var r = e.charAt(0),
      t = t.split(r);
    return r === e
      ? t
      : t[(e = parseInt(e.substring(1), 10)) < 0 ? t.length + e : e - 1];
  }

  function _a(e, t) {
    for (
      var r,
        n,
        i = e.charAt(0),
        o = t.split("&"),
        s = [],
        a = {},
        c = e.substring(1),
        p = 0,
        u = o.length;
      p < u;
      p++
    )
      if (
        "" !==
        (s = (s = o[p].match(/(.*?)=(.*)/)) || [o[p], o[p], ""])[1].replace(
          /\s/g,
          ""
        )
      ) {
        if (
          ((s[2] =
            ((n = s[2] || ""), _.decodeURIComponent(n.replace(/\+/g, " ")))),
          c === s[1])
        )
          return s[2];
        (r = s[1].match(/(.*)\[([0-9]+)\]/))
          ? ((a[r[1]] = a[r[1]] || []), (a[r[1]][r[2]] = s[2]))
          : (a[s[1]] = s[2]);
      }
    return i === e ? a : a[c];
  }

  (_.each = function (e, t, r) {
    if (null !== e)
      if (nativeForEach && e.forEach === nativeForEach) e.forEach(t, r);
      else if (e.length === +e.length) {
        for (var n = 0, i = e.length; n < i; n++)
          if (n in e && t.call(r, e[n], n, e) === breaker) return;
      } else
        for (var o in e)
          if (hasOwnProperty.call(e, o) && t.call(r, e[o], o, e) === breaker)
            return;
  }),
    (_.extend = function (r) {
      return (
        _.each(slice.call(arguments, 1), function (e) {
          for (var t in e) void 0 !== e[t] && (r[t] = e[t]);
        }),
          r
      );
    }),
    (_.formatDate = function (e) {
      function t(e) {
        return e < 10 ? "0" + e : e;
      }

      return (
        e.getFullYear() +
        "-" +
        t(e.getMonth() + 1) +
        "-" +
        t(e.getDate()) +
        " " +
        t(e.getHours()) +
        ":" +
        t(e.getMinutes()) +
        ":" +
        t(e.getSeconds()) +
        "." +
        ((r = e.getMilliseconds()) < 10 ? "00" + r : r < 100 ? "0" + r : r)
      );
      var r;
    }),
    (_.formatJsonString = function (t) {
      try {
        return JSON.stringify(t, null, 8);
      } catch (e) {
        return JSON.stringify(t);
      }
    }),
    (_.searchObjDate = function (r) {
      (_.check.isObject(r) || _.check.isArray(r)) &&
      _.each(r, function (e, t) {
        _.check.isObject(e) || _.check.isArray(e)
          ? _.searchObjDate(r[t])
          : _.check.isDate(e) && (r[t] = _.formatDate(e));
      });
    }),
    (_.check = {
      isUndefined: function (e) {
        return void 0 === e;
      },
      isObject: function (e) {
        return "[object Object]" === toString.call(e) && null !== e;
      },
      isEmptyObject: function (e) {
        if (_.check.isObject(e)) {
          for (var t in e) if (hasOwnProperty.call(e, t)) return !1;
          return !0;
        }
        return !1;
      },
      isArray: function (e) {
        return "[object Array]" === toString.call(e);
      },
      isString: function (e) {
        return "[object String]" === toString.call(e);
      },
      isDate: function (e) {
        return "[object Date]" === toString.call(e);
      },
      isNumber: function (e) {
        return "[object Number]" === toString.call(e);
      },
      isBoolean: function (e) {
        return "[object Boolean]" === toString.call(e);
      },
      isJSONString: function (e) {
        try {
          JSON.parse(e);
        } catch (e) {
          return !1;
        }
        return !0;
      },
    }),
    (_.UUID = function () {
      var e =
          (e = String(screen.height * screen.width)) && /\d{5,}/.test(e)
            ? e.toString(16)
            : String(31242 * Math.random())
              .replace(".", "")
              .slice(0, 8),
        e =
          za() +
          "-" +
          Math.random().toString(16).replace(".", "") +
          "-" +
          (function () {
            var e,
              t,
              r = navigator.userAgent,
              i = [],
              n = 0;

            function o(e, t) {
              for (var r = 0, n = 0; n < t.length; n++) r |= i[n] << (8 * n);
              return e ^ r;
            }

            for (e = 0; e < r.length; e++)
              (t = r.charCodeAt(e)),
                i.unshift(255 & t),
              4 <= i.length && ((n = o(n, i)), (i = []));
            return (n = 0 < i.length ? o(n, i) : n).toString(16);
          })() +
          "-" +
          e +
          "-" +
          za();
      return (
        e ||
        (
          String(Math.random()) +
          String(Math.random()) +
          String(Math.random())
        ).slice(2, 15)
      );
    }),
    (_.UUIDv4 = function () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (e) {
          var t = (16 * Math.random()) | 0;
          return ("x" == e ? t : (3 & t) | 8).toString(16);
        }
      );
    }),
    (_.getReferrer = function (e) {
      e = e || document.referrer;
      return "string" != typeof e
        ? "取值异常_referrer异常_" + String(e)
        : "string" ==
        typeof (e = (e =
          0 === e.indexOf("https://www.baidu.com/")
            ? e.split("?")[0]
            : e).slice(0, MAX_REFERRER_STRING_LENGTH))
          ? e
          : "";
    }),
    (_.url = function (e, t) {
      var r = {};
      if ("tld?" === e) return Ya();
      if (((t = t || window.location.toString()), !e)) return t;
      if (((e = e.toString()), (n = t.match(/^mailto:([^\/].+)/))))
        (r.protocol = "mailto"), (r.email = n[1]);
      else {
        if (
          ((n = (t = (n = t.match(/(.*?)\/#\!(.*)/)) ? n[1] + n[2] : t).match(
            /(.*?)#(.*)/
          )) && ((r.hash = n[2]), (t = n[1])),
          r.hash && e.match(/^#/))
        )
          return _a(e, r.hash);
        if (
          ((n = t.match(/(.*?)\?(.*)/)) && ((r.query = n[2]), (t = n[1])),
          r.query && e.match(/^\?/))
        )
          return _a(e, r.query);
        if (
          ((n = t.match(/(.*?)\:?\/\/(.*)/)) &&
          ((r.protocol = n[1].toLowerCase()), (t = n[2])),
          (n = t.match(/(.*?)(\/.*)/)) && ((r.path = n[2]), (t = n[1])),
            (r.path = (r.path || "")
              .replace(/^([^\/])/, "/$1")
              .replace(/\/$/, "")),
            (e = e.match(/^[\-0-9]+$/) ? e.replace(/^([^\/])/, "/$1") : e).match(
              /^\//
            ))
        )
          return $a(e, r.path.substring(1));
        if (
          ((n =
            (n = $a("/-1", r.path.substring(1))) && n.match(/(.*?)\.(.*)/)) &&
          ((r.file = n[0]), (r.filename = n[1]), (r.fileext = n[2])),
          (n = t.match(/(.*)\:([0-9]+)$/)) && ((r.port = n[2]), (t = n[1])),
          (n = t.match(/(.*?)@(.*)/)) && ((r.auth = n[1]), (t = n[2])),
          r.auth &&
          ((n = r.auth.match(/(.*)\:(.*)/)),
            (r.user = n ? n[1] : r.auth),
            (r.pass = n ? n[2] : void 0)),
            (r.hostname = t.toLowerCase()),
          "." === e.charAt(0))
        )
          return $a(e, r.hostname);
        Ya() &&
        (n = r.hostname.match(Ya())) &&
        ((r.tld = n[3]),
          (r.domain = n[2] ? n[2] + "." + n[3] : void 0),
          (r.sub = n[1] || void 0));
        var n = r.port ? ":" + r.port : "";
        (r.protocol = r.protocol || window.location.protocol.replace(":", "")),
          (r.port = r.port || ("https" === r.protocol ? "443" : "80")),
          (r.protocol = r.protocol || ("443" === r.port ? "https" : "http")),
          (r.basic = r.protocol + "://" + r.hostname + n);
      }
      return e in r ? r[e] : "{}" === e ? r : "";
    }),
    (_.hashCode = function (e) {
      if ("string" != typeof e) return 0;
      var t = 0;
      if (0 === e.length) return t;
      for (var r = 0; r < e.length; r++)
        (t = (t << 5) - t + e.charCodeAt(r)), (t &= t);
      return t;
    }),
    (_.decodeURIComponent = function (t) {
      var r = "";
      try {
        r = decodeURIComponent(t);
      } catch (e) {
        r = t;
      }
      return r;
    }),
    (_.encodeURIComponent = function (t) {
      var r = "";
      try {
        r = encodeURIComponent(t);
      } catch (e) {
        r = t;
      }
      return r;
    }),
    (_.utf8Encode = function (e) {
      for (
        var t,
          r = "",
          n = (t = 0),
          i = (e = (e + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length,
          o = 0;
        o < i;
        o++
      ) {
        var s = e.charCodeAt(o),
          a = null;
        s < 128
          ? t++
          : (a =
            127 < s && s < 2048
              ? String.fromCharCode((s >> 6) | 192, (63 & s) | 128)
              : String.fromCharCode(
              (s >> 12) | 224,
              ((s >> 6) & 63) | 128,
              (63 & s) | 128
              )),
        null !== a &&
        (n < t && (r += e.substring(n, t)), (r += a), (n = t = o + 1));
      }
      return n < t && (r += e.substring(n, e.length)), r;
    }),
    (_.base64Encode = function (e) {
      var t,
        r,
        n,
        i,
        o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        s = 0,
        a = 0,
        c = "",
        p = [];
      if (!e) return e;
      for (
        e = _.utf8Encode(e);
        (t =
          ((i =
            (e.charCodeAt(s++) << 16) |
            (e.charCodeAt(s++) << 8) |
            e.charCodeAt(s++)) >>
            12) &
          63),
          (r = (i >> 6) & 63),
          (n = 63 & i),
          (p[a++] =
            o.charAt((i >> 18) & 63) + o.charAt(t) + o.charAt(r) + o.charAt(n)),
        s < e.length;
      ) ;
      switch (((c = p.join("")), e.length % 3)) {
        case 1:
          c = c.slice(0, -2) + "==";
          break;
        case 2:
          c = c.slice(0, -1) + "=";
      }
      return c;
    }),
    (_.cookie = {
      get: function (e) {
        for (
          var t = e + "=", r = document.cookie.split(";"), n = 0;
          n < r.length;
          n++
        ) {
          for (var i = r[n]; " " === i.charAt(0);)
            i = i.substring(1, i.length);
          if (0 === i.indexOf(t))
            return _.decodeURIComponent(i.substring(t.length, i.length));
        }
        return null;
      },
      set: function (e, t, r, n, i) {
        var o,
          s = "",
          a = "",
          c = "";
        (r = null === r ? 73e3 : r),
        n &&
        (s = (o = _.url("domain", location.href)) ? "; domain=." + o : ""),
        r &&
        ((o = new Date()),
          "s" === String(r).slice(-1)
            ? o.setTime(o.getTime() + 1e3 * Number(String(r).slice(0, -1)))
            : o.setTime(o.getTime() + 24 * r * 60 * 60 * 1e3),
          (a = "; expires=" + o.toGMTString())),
        i && (c = "; secure");
        c = e + "=" + encodeURIComponent(t) + a + "; path=/" + s + c;
        return (document.cookie = c);
      },
      remove: function (e, t) {
        _.cookie.set(e, "", -1, t);
      },
    }),
    (_.localStorage = {
      get: function (e) {
        try {
          return window.localStorage.getItem(e);
        } catch (e) {
          _.localStorage.error(e);
        }
      },
      parse: function (e) {
        var t;
        try {
          t = JSON.parse(_.localStorage.get(e)) || null;
        } catch (e) {
          _.localStorage.error(e);
        }
        return t;
      },
      set: function (e, t) {
        try {
          window.localStorage.setItem(e, t);
        } catch (e) {
          _.localStorage.error(e);
        }
      },
      remove: function (e) {
        try {
          window.localStorage.removeItem(e);
        } catch (e) {
          _.localStorage.error(e);
        }
      },
      error: function (e) {
        console.error("localStorage error: " + e);
      },
      isSupported: function () {
        var t = !0;
        try {
          var e = "__thinkingdatasupport__",
            r = "testIsSupportStorage";
          _.localStorage.set(e, r),
          _.localStorage.get(e) !== r && (t = !1),
            _.localStorage.remove(e);
        } catch (e) {
          t = !1;
        }
        return t;
      },
    }),
    (_.stripEmptyProperties = function (e) {
      var r = {};
      return (
        _.each(e, function (e, t) {
          _.check.isString(e) && 0 < e.length && (r[t] = e);
        }),
          r
      );
    }),
    (_.info = {
      os: function () {
        var e = navigator.userAgent;
        return /Windows/i.test(e)
          ? /Phone/.test(e) || /WPDesktop/.test(e)
            ? "Windows Phone"
            : "Windows"
          : /(iPhone|iPad|iPod)/.test(e)
            ? "iOS"
            : /Android/.test(e)
              ? "Android"
              : /(BlackBerry|PlayBook|BB10)/i.test(e)
                ? "BlackBerry"
                : /Mac/i.test(e)
                  ? "Mac OS X"
                  : /Linux/.test(e)
                    ? "Linux"
                    : /CrOS/.test(e)
                      ? "Chrome OS"
                      : "";
      },
      browser: function () {
        var e = {
          type: "",
          version: "",
        };
        try {
          var t,
            r,
            n = navigator.userAgent.toLowerCase(),
            i = [];
          null !== n.match(/baidubrowser/)
            ? ((e.type = "baidu"), i.push(/baidubrowser\/([\d.]+)/))
            : null !== n.match(/bidubrowser/)
            ? ((e.type = "baidu"), i.push(/bidubrowser\/([\d.]+)/))
            : null !== n.match(/edga/)
              ? ((e.type = "edge"), i.push(/edga\/([\d.]+)/))
              : null !== n.match(/edgios/)
                ? ((e.type = "edge"), i.push(/edgios\/([\d.]+)/))
                : null !== n.match(/liebaofast/)
                  ? ((e.type = "liebao"), i.push(/liebaofast\/([\d.]+)/))
                  : null !== n.match(/sogoumobilebrowser/)
                    ? ((e.type = "sogou"), i.push(/sogoumobilebrowser\/([\d.]+)/))
                    : null !== n.match(/lbbrowser/)
                      ? ((e.type = "liebao"), i.push(/lbbrowser\/([\d.]+)/))
                      : null !== n.match(/crios/)
                        ? ((e.type = "chrome"), i.push(/crios\/([\d.]+)/))
                        : null !== n.match(/qihoobrowser/)
                          ? ((e.type = "360"), i.push(/qihoobrowser\/([\d.]+)/))
                          : null !== n.match(/mxios/)
                            ? ((e.type = "maxthon"), i.push(/mxios\/([\d.]+)/))
                            : null !== n.match(/fxios/)
                              ? ((e.type = "firefox"), i.push(/fxios\/([\d.\w]+)/))
                              : null !== n.match(/edge/)
                                ? ((e.type = "edge"), i.push(/edge\/([\d.]+)/))
                                : null !== n.match(/metasr/)
                                  ? ((e.type = "sogou"), i.push(/metasr ([\d.]+)/))
                                  : null !== n.match(/micromessenger/)
                                    ? ((e.type = "micromessenger"), i.push(/micromessenger\/([\d.]+)/))
                                    : null !== n.match(/mqqbrowser/)
                                      ? ((e.type = "qq"), i.push(/mqqbrowser\/([\d.]+)/))
                                      : null !== n.match(/qqbrowserlite/)
                                        ? ((e.type = "qq"), i.push(/qqbrowserlite\/([\d.]+)/))
                                        : null !== n.match(/tencenttraveler/)
                                          ? ((e.type = "qq"), i.push(/tencenttraveler\/([\d.]+)/))
                                          : null !== n.match(/qqbrowser/)
                                            ? ((e.type = "qq"), i.push(/qqbrowser\/([\d.]+)/))
                                            : null !== n.match(/maxthon/)
                                              ? ((e.type = "maxthon"), i.push(/maxthon\/([\d.]+)/))
                                              : null !== n.match(/ubrowser/)
                                                ? ((e.type = "uc"), i.push(/ubrowser\/([\d.]+)/))
                                                : null !== n.match(/ucbrowser/)
                                                  ? ((e.type = "uc"), i.push(/ucbrowser\/([\d.]+)/))
                                                  : null !== n.match(/firefox/)
                                                    ? ((e.type = "firefox"), i.push(/firefox\/([\d.]+)/))
                                                    : null !== n.match(/opera/)
                                                      ? ((e.type = "opera"), i.push(/opera\/([\d.]+)/))
                                                      : null !== n.match(/opr/)
                                                        ? ((e.type = "opera"), i.push(/opr\/([\d.]+)/))
                                                        : null !== n.match(/chrome/)
                                                          ? ((e.type = "chrome"), i.push(/chrome\/([\d.]+)/))
                                                          : null !== n.match(/safari/)
                                                            ? ((e.type = "safari"), i.push(/version\/([\d.]+)/))
                                                            : (null === n.match(/trident/) && null === n.match(/msie/)) ||
                                                            (e.type = "ie"),
            "ie" === e.type
              ? ((t = n.match(/trident\/([\d.]+)/)
              ? n.match(/trident\/([\d.]+)/)[1]
              : ""),
                (r = n.match(/msie ([\d.]+)/)
                  ? n.match(/msie ([\d.]+)/)[1]
                  : ""),
                "" !== t
                  ? (e.version = String(parseInt(t) + 4))
                  : "" !== r && (e.version = r))
              : i && (e.version = n.match(i[0]) ? n.match(i[0])[1] : "");
        } catch (e) {
          Log.w("getting browser info failed due to ", e);
        }
        return e;
      },
      properties: function () {
        var e = _.info.browser();
        return _.extend({
          "#os": _.info.os(),
          "#lib_version": Config.LIB_VERSION,
          "#lib": "js",
          "#screen_height": screen.height,
          "#screen_width": screen.width,
          "#browser": e.type,
          "#browser_version": e.version,
        });
      },
      pageProperties: function () {
        var e = _.getReferrer();
        return _.stripEmptyProperties({
          "#referrer": e,
          "#referrer_host": e && _.url("hostname", e),
          "#url": location.href,
          "#url_path": location.pathname,
          "#title": document.title,
        });
      },
    });
  var Log = (function () {
      function e() {
        _classCallCheck(this, e);
      }

      return (
        _createClass(e, null, [
          {
            key: "i",
            value: function () {
              if (!this.showLog) return !1;
              if (
                ((!0 !== this.showLog && "string" !== this.showLog) ||
                (arguments[0] = _.formatJsonString(arguments[0])),
                "object" ===
                ("undefined" == typeof console
                  ? "undefined"
                  : _typeof(console)) && console.log)
              )
                try {
                  return console.log.apply(console, arguments);
                } catch (e) {
                  console.log(arguments[0]);
                }
            },
          },
          {
            key: "w",
            value: function () {
              if (!this.showLog) return !1;
              if (
                ((!0 !== this.showLog && "string" !== this.showLog) ||
                (arguments[0] = _.formatJsonString(arguments[0])),
                "object" ===
                ("undefined" == typeof console
                  ? "undefined"
                  : _typeof(console)) && console.warn)
              )
                try {
                  return console.warn.apply(console, arguments);
                } catch (e) {
                  console.warn(arguments[0]);
                }
            },
          },
        ]),
          e
      );
    })(),
    KEY_NAME_MATCH_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{0,49}$/,
    PropertyChecker = (function () {
      function e() {
        _classCallCheck(this, e);
      }

      return (
        _createClass(e, null, [
          {
            key: "stripProperties",
            value: function (e) {
              return (
                _.check.isObject(e) &&
                _.each(e, function (e, t) {
                  _.check.isString(e) ||
                  _.check.isNumber(e) ||
                  _.check.isDate(e) ||
                  _.check.isBoolean(e) ||
                  _.check.isArray(e) ||
                  _.check.isObject(e) ||
                  Log.w(
                    "您的数据-",
                    t,
                    e,
                    "-格式不满足要求，可能无法正确入库. 属性值只支持 String, Number, Date, Boolean, Array，Object"
                  );
                }),
                  e
              );
            },
          },
          {
            key: "_checkPropertiesKey",
            value: function (e) {
              var r = !0;
              return (
                _.each(e, function (e, t) {
                  KEY_NAME_MATCH_REGEX.test(t) ||
                  (Log.w("不合法的 KEY 值: " + t), (r = !1));
                }),
                  r
              );
            },
          },
          {
            key: "event",
            value: function (e) {
              return (
                !(!_.check.isString(e) || !KEY_NAME_MATCH_REGEX.test(e)) ||
                (Log.w(
                  "请检查参数格式, eventName 必须是英文字母或者 '_' 开头, 包含字母和数字的不超过50个字符的字符串: " +
                  e
                ),
                  !1)
              );
            },
          },
          {
            key: "propertyName",
            value: function (e) {
              return (
                !(!_.check.isString(e) || !KEY_NAME_MATCH_REGEX.test(e)) ||
                (Log.w(
                  "请检查参数格式, propertyName 必须是英文字母或者 '_' 开头, 包含字母和数字的不超过50个字符的字符串: " +
                  e
                ),
                  !1)
              );
            },
          },
          {
            key: "properties",
            value: function (e) {
              return (
                this.stripProperties(e),
                !e ||
                (_.check.isObject(e)
                  ? !!this._checkPropertiesKey(e) ||
                  (Log.w(
                    "请检查参数格式, properties 的 key 只能以字母开头，包含数字、字母和下划线 _，长度最大为50个字符"
                  ),
                    !1)
                  : (Log.w("properties 可以没有，但有的话必须是对象"), !1))
              );
            },
          },
          {
            key: "propertiesMust",
            value: function (e) {
              return (
                this.stripProperties(e),
                  void 0 === e || !_.check.isObject(e) || _.check.isEmptyObject(e)
                    ? (Log.w("properties必须是对象且有值"), !1)
                    : !!this._checkPropertiesKey(e) ||
                    (Log.w(
                      "请检查参数格式, properties 的 key 只能以字母开头，包含数字、字母和下划线 _，长度最大为50个字符"
                    ),
                      !1)
              );
            },
          },
          {
            key: "userId",
            value: function (e) {
              return (
                !(!_.check.isString(e) || !/^.{1,63}$/.test(e)) ||
                (Log.w("用户 id 必须是不能为空，且小于 64 位的字符串"), !1)
              );
            },
          },
        ]),
          e
      );
    })(),
    MASTER_INSTANCE_NAME = "thinkingdata",
    DEFAULT_CONFIG = {
      _name: MASTER_INSTANCE_NAME,
      appId: "",
      persistence: "localStorage",
      persistencePrefix: "ThinkingDataJSSDK",
      persistenceEnabled: !0,
      crossSubDomain: !0,
      maxReferrerStringLength: 200,
      showLog: !0,
      dataSendTimeout: 3e3,
      useAppTrack: !1,
      strict: !1,
    },
    ThinkingDataPersistence = function (e) {
      (this._state = {}),
        (this.crossSubDomain = e.crossSubDomain),
        (this.enabled = e.persistenceEnabled);
      var t,
        r = null;
      this.enabled &&
      (!1 === e.crossSubDomain
        ? ((t = _.url("sub", location.href)),
          (this.name =
            "string" == typeof t && "" !== t
              ? e.persistencePrefix + "_" + t
              : e.persistencePrefix + "_root"))
        : (this.name = e.persistencePrefix + "_cross"),
      "cookie" !== (t = e.persistence) &&
      "localStorage" !== t &&
      (Log.i("Unknown persistence type " + t + "; falling back to cookie"),
        (t = e.persistence = "cookie")),
        "localStorage" === t && _.localStorage.isSupported()
          ? ((this.storage = _.localStorage),
          (r = _.cookie.get(this.name)) &&
          _.cookie.remove(this.name, this.crossSubDomain))
          : (Log.i(
          "localStorage is not support by the browser; falling back to cookie"
          ),
            (this.storage = _.cookie))),
        this._load(r),
      this.getDistinctId() ||
      ((e = e.uuid || _.UUID()),
        this._setDeviceId(e),
        this.setDistinctId(e));
    };
  (ThinkingDataPersistence.prototype._load = function (e) {
    var t;
    this.enabled &&
    (null !== (t = null !== e ? e : this.storage.get(this.name)) &&
    _.check.isJSONString(t) &&
    (this._state = _.extend({}, JSON.parse(t))),
    null !== e && this._save());
  }),
    (ThinkingDataPersistence.prototype.getDistinctId = function () {
      return this._state.distinct_id;
    }),
    (ThinkingDataPersistence.prototype.setDistinctId = function (e) {
      this._set("distinct_id", e);
    }),
    (ThinkingDataPersistence.prototype.setEnableTracking = function (e) {
      this._set("enable_tracking", e);
    }),
    (ThinkingDataPersistence.prototype.getEnableTracking = function () {
      return (
        !!_.check.isUndefined(this._state.enable_tracking) ||
        this._state.enable_tracking
      );
    }),
    (ThinkingDataPersistence.prototype.clear = function () {
      (this._state = {}), this._save();
    }),
    (ThinkingDataPersistence.prototype.setOptTracking = function (e) {
      this._set("opt_tracking", e);
    }),
    (ThinkingDataPersistence.prototype.getOptTracking = function () {
      return (
        !!_.check.isUndefined(this._state.opt_tracking) ||
        this._state.opt_tracking
      );
    }),
    (ThinkingDataPersistence.prototype.setDistinctId = function (e) {
      this._set("distinct_id", e);
    }),
    (ThinkingDataPersistence.prototype.getAccountId = function () {
      return this._state.account_id;
    }),
    (ThinkingDataPersistence.prototype.setAccountId = function (e) {
      this._set("account_id", e);
    }),
    (ThinkingDataPersistence.prototype.getDeviceId = function () {
      return this._state.device_id;
    }),
    (ThinkingDataPersistence.prototype.setSuperProperties = function (e) {
      this._set("super_properties", e);
    }),
    (ThinkingDataPersistence.prototype.getSuperProperties = function () {
      return this._state.super_properties || {};
    }),
    (ThinkingDataPersistence.prototype.setEventTimer = function (e, t) {
      var r = this._state.event_timers || {};
      (r[e] = t), this._set("event_timers", r);
    }),
    (ThinkingDataPersistence.prototype.clearEventTimer = function () {
      this._set("event_timers", {});
    }),
    (ThinkingDataPersistence.prototype.removeEventTimer = function (e) {
      var t = (this._state.event_timers || {})[e];
      return (
        _.check.isUndefined(t) ||
        (delete this._state.event_timers[e], this._save()),
          t
      );
    }),
    (ThinkingDataPersistence.prototype._setDeviceId = function (e) {
      this._state.device_id
        ? Log.w(
        "Current device_id is ",
        this.getDeviceId(),
        ", it couldn't been set to: ",
        e
        )
        : this._set("device_id", e);
    }),
    (ThinkingDataPersistence.prototype._save = function () {
      this.enabled &&
      this.storage.set(
        this.name,
        JSON.stringify(this._state),
        73e3,
        this.crossSubDomain
      );
    }),
    (ThinkingDataPersistence.prototype._set = function (e, t) {
      (this._state = this._state || {}), (this._state[e] = t), this._save();
    });
  var ThinkingDataAnalyticsLib = function () {
    },
    tdMaster;

  function initAsModule() {
    return (tdMaster = new ThinkingDataAnalyticsLib());
  }

  (ThinkingDataAnalyticsLib.prototype.trackLink = function (e, r, n) {
    var i,
      o,
      s = this;
    this._isCollectData() &&
    ((i = this._getConfig("strict")),
      PropertyChecker.properties(n) || !i
        ? e &&
        _.check.isObject(e) &&
        ((o = []),
          _.each(e, function (e, r) {
            e &&
            _.check.isArray(e) &&
            _.each(e, function (e) {
              switch (r) {
                case "tag":
                  _.each(document.getElementsByTagName(e), function (e) {
                    o.indexOf(e) < 0 && o.push(e);
                  });
                  break;
                case "class":
                  _.each(document.getElementsByClassName(e), function (e) {
                    o.indexOf(e) < 0 && o.push(e);
                  });
                  break;
                case "id":
                  var t = document.getElementById(e);
                  null !== t && o.indexOf(t) < 0 && o.push(t);
              }
            });
          }),
          _.each(o, function (e) {
            var t;
            null !== e &&
            (((t = _.extend({}, _.info.pageProperties(), n))[
              "#element_type"
              ] = e.nodeName.toLowerCase()),
            _.check.isUndefined(t.name) &&
            (t.name =
              e.getAttribute("td-name") ||
              e.innerHTML ||
              e.value ||
              "未获取标识"),
              e.addEventListener("click", function () {
                s._sendRequest({
                  type: "track",
                  event: r,
                  properties: i ? PropertyChecker.stripProperties(t) : t,
                });
              }));
          }))
        : Log.w("trackLink failed due to invalid properties."));
  }),
    (ThinkingDataAnalyticsLib.prototype.setPageProperty = function (e) {
      this._isCollectData() &&
      (PropertyChecker.properties(e) || !this._getConfig("strict")
        ? _.extend(this.currentProps, e)
        : Log.w("PageProperty 输入的参数有误"));
    }),
    (ThinkingDataAnalyticsLib.prototype.getPageProperty = function () {
      return this.currentProps;
    }),
    (ThinkingDataAnalyticsLib.prototype.getPresetProperties = function () {
      var e = _.info.properties(),
        t = {};
      (t.os = e["#os"]),
        (t.screenWidth = e["#screen_width"]),
        (t.screenHeight = e["#screen_height"]),
        (t.browser = e["#browser"]),
        (t.browserVersion = e["#browser_version"]),
        (t.deviceId = this.getDeviceId());
      e = 0 - new Date().getTimezoneOffset() / 60;
      return (
        (t.zoneOffset = e),
          (t.toEventPresetProperties = function () {
            return {
              "#os": t.os,
              "#screen_width": t.screenWidth,
              "#screen_height": t.screenHeight,
              "#browser": t.browser,
              "#browser_version": t.browserVersion,
              "#device_id": t.deviceId,
              "#zone_offset": t.zoneOffset,
            };
          }),
          t
      );
    }),
    (ThinkingDataAnalyticsLib.prototype.login = function (e) {
      this._isCollectData() &&
      ("number" == typeof e && (e = String(e)),
        PropertyChecker.userId(e) || !this._getConfig("strict")
          ? e !== this.persistence.getAccountId() &&
          this.persistence.setAccountId(e)
          : Log.e("login 的参数必须是字符串"));
    }),
    (ThinkingDataAnalyticsLib.prototype.logout = function (e) {
      this._isCollectData() &&
      (!0 === e && ((e = _.UUID()), this.persistence.setDistinctId(e)),
        this.persistence.setAccountId(""));
    }),
    (ThinkingDataAnalyticsLib.prototype.userSet = function (e, t) {
      this._isCollectData() &&
      ((!PropertyChecker.propertiesMust(e) && this._getConfig("strict")) ||
        this._sendRequest(
          {
            type: "user_set",
            properties: e,
          },
          t
        ));
    }),
    (ThinkingDataAnalyticsLib.prototype.userSetOnce = function (e, t) {
      this._isCollectData() &&
      ((!PropertyChecker.propertiesMust(e) && this._getConfig("strict")) ||
        this._sendRequest(
          {
            type: "user_setOnce",
            properties: e,
          },
          t
        ));
    }),
    (ThinkingDataAnalyticsLib.prototype.userUnset = function (e, t) {
      var r;
      this._isCollectData() &&
      ((!PropertyChecker.propertyName(e) && this._getConfig("strict")) ||
        (((r = {})[e] = 0),
          this._sendRequest(
            {
              type: "user_unset",
              properties: r,
            },
            t
          )));
    }),
    (ThinkingDataAnalyticsLib.prototype.userAdd = function (e, t) {
      var r;
      this._isCollectData() &&
      (_.check.isString(e) && ((r = e), ((e = {})[r] = 1)),
      PropertyChecker.propertiesMust(e) &&
      (!(function (e) {
        for (var t in e) if (!/-*\d+/.test(String(e[t]))) return;
        return 1;
      })(e) && this._getConfig("strict")
        ? Log.w("userAdd 属性中的值只能是数字")
        : this._sendRequest(
          {
            type: "user_add",
            properties: e,
          },
          t
        )));
    }),
    (ThinkingDataAnalyticsLib.prototype.userAppend = function (e, t) {
      this._isCollectData() &&
      ((PropertyChecker.propertiesMust(e) &&
        (function (e) {
          for (var t in e) if (!_.check.isArray(e[t])) return;
          return 1;
        })(e)) ||
      !this._getConfig("strict")
        ? this._sendRequest(
          {
            type: "user_append",
            properties: e,
          },
          t
        )
        : Log.w("userAppend 属性中的值只能是 Array"));
    }),
    (ThinkingDataAnalyticsLib.prototype.userDel = function (e) {
      this._isCollectData() &&
      this._sendRequest(
        {
          type: "user_del",
        },
        e
      );
    }),
    (ThinkingDataAnalyticsLib.prototype._sendRequest = function (e, t, r, send = true) {
      var n,
        i,
        o,
        s,
        a,
        ps,
        ed,
        c =
          _.check.isUndefined(e.time) || !_.check.isDate(e.time)
            ? new Date()
            : e.time,
        p = {
          data: [
            {
              "#type": e.type,
              "#time": _.formatDate(c),
              "#distinct_id": this.persistence.getDistinctId(),
            },
          ],
        };
      if (
        (this.persistence.getAccountId() &&
        (p.data[0]["#account_id"] = this.persistence.getAccountId()),
          (p.automaticData = _.extend(
            {},
            {
              "#device_id": this.persistence.getDeviceId(),
              "#zone_offset": 0 - c.getTimezoneOffset() / 60,
            },
            _.info.properties()
          )),
          "track" === e.type ||
          "track_update" === e.type ||
          "track_overwrite" === e.type
            ? ((p.data[0]["#event_name"] = e.event),
              "track_update" === e.type || "track_overwrite" === e.type
                ? (p.data[0]["#event_id"] = e.extraId)
                : e.firstCheckId &&
                (p.data[0]["#first_check_id"] = e.firstCheckId),
              (p.data[0].properties = _.extend(
                {},
                {
                  "#device_id": this.persistence.getDeviceId(),
                  "#zone_offset": 0 - c.getTimezoneOffset() / 60,
                },
                _.info.properties(),
                this.getSuperProperties(),
                this.dynamicProperties ? this.dynamicProperties() : {},
                this.getPageProperty()
              )),
              (c = this.persistence.removeEventTimer(e.event)),
            _.check.isUndefined(c) ||
            ((c = new Date().getTime() - c),
              (p.data[0].properties["#duration"] = parseFloat(
                (c / 1e3).toFixed(3)
              ))))
            : (p.data[0].properties = {}),
        _.check.isObject(e.properties) &&
        !_.check.isEmptyObject(e.properties) &&
        _.extend(p.data[0].properties, e.properties),
          _.searchObjDate(p.data[0]),
          (p["#app_id"] = this._getConfig("appId")),
          (p["#flush_time"] = new Date().getTime()),
          Log.i(p),
          this._getConfig("useAppTrack"))
      ) {
        e = window.ThinkingData_APP_JS_Bridge || {};
        if ("object" === _typeof(e) && e.thinkingdata_track)
          return (
            e.thinkingdata_track(JSON.stringify(p)),
              void ("function" == typeof t && t())
          );
        if (/td-sdk-ios/.test(navigator.userAgent) && !window.MSStream) {
          e = document.createElement("iframe");
          return (
            e.setAttribute(
              "src",
              "thinkinganalytics://trackEvent?event=" +
              _.encodeURIComponent(JSON.stringify(p))
            ),
              document.documentElement.appendChild(e),
              e.parentNode.removeChild(e),
              (e = null),
              void ("function" == typeof t && t())
          );
        }
      }
      (p.data[0]["#uuid"] = _.UUIDv4()),
        a = this,
        (this._isEncrypt() &&
          (
            ps = Math.round(Math.random() * 10000000000000000) + '',
              console.log(ps),
            ed = [],
            p.data.forEach(item => {
              ed.push({
                ekey: a._encryptPass(ps, a.crypto.pub_key),
                pkv: a.crypto.version,
                payload: a._encryptInfo(JSON.stringify(item), ps)
              })
          }),
          p.data = ed,
          p.client = 'js'
          )
        ),
        ((p = JSON.stringify(p)),
          (n = _.base64Encode(p)),
          (s = "crc=" + _.hashCode(n)),
          (i =
            "&data=" +
            _.encodeURIComponent(n) +
            "&ext=" +
            _.encodeURIComponent(s) +
            "&version=" +
            Config.LIB_VERSION)),
        (o = null),
        (o = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject("Microsoft.XMLHTTP")),
        (s = this._getConfig("serverUrl")),
        o.open("post", s, !0),
        o.setRequestHeader(
          "Content-Type",
          a._isDebug() ? "application/json;charset=UTF-8" : "application/gzip"
        ),
        (o.onreadystatechange = function () {
          var e;
          4 === o.readyState &&
          200 === o.status &&
          (t && t(),
          a._isDebug() &&
          (0 !== (e = JSON.parse(o.response)).errorLevel
            ? Log.w(e)
            : Log.i(e)));
        }),
        a._isDebug() ?
          send && o.send(p) :
          send && o.send(pako.gzip(p, {to: 'string'})),
      r &&
      void 0 !==
      ("undefined" == typeof navigator
        ? "undefined"
        : _typeof(navigator)) &&
      navigator.sendBeacon &&
      ((r = new FormData()).append("data", n),
        navigator.sendBeacon(this._getConfig("serverUrl"), r));
      return send ? (new Promise(((resolve, reject) => {
        o.onload = function () {
          if (o.readyState === 4) {
            if (o.status === 200) {
              resolve({
                res: o.responseText,
                req: p
              });
            } else {
              reject(o)
            }
          }
        };
        o.onerror = function () {
          reject(o)
        }
      }))) : p;
    }),
    (ThinkingDataAnalyticsLib.prototype._isDebug = function () {
      return (
        "debug" === this._getConfig("mode") ||
        "debug_only" === this._getConfig("mode")
      );
    }),
    (ThinkingDataAnalyticsLib.prototype._isEncrypt = function () {
      return !!this._getConfig("encrypt")
    }),
    (ThinkingDataAnalyticsLib.prototype._setEncrypt = function () {
      let t = this
      var x = new XMLHttpRequest()
      x.open("get", 'http://deapi.adsgreat.cn/v1/settings', !0)
      x.send()
      x.onload = function () {
        if (x.readyState === 4) {
          if (x.status === 200) {
            t.crypto = JSON.parse(x.responseText).data.crypto
          } else {
            console.error('公钥拉取失败！')
          }
        }
      }
    }),
    (ThinkingDataAnalyticsLib.prototype._encryptInfo = function (text, secretKey) {
      const key = CryptoJS.enc.Utf8.parse(secretKey)
      const message = CryptoJS.enc.Utf8.parse(text);
      const encrypted = CryptoJS.AES.encrypt(message, key, {
        "iv": key,
        "mode": CryptoJS.mode.CBC,
        "padding": CryptoJS.pad.Pkcs7
      });
      return encrypted.toString()
    }),
    (ThinkingDataAnalyticsLib.prototype._encryptPass = function (password, key) {
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(key);
      const encrypted = encrypt.encrypt(password)
      console.log(encrypted);
      return encrypted
    }),
    (ThinkingDataAnalyticsLib.prototype.startHeartbeat = function (t = 5000) {
      const a = this;
      if (!a.heartbeatInterval) {
        let s = { interval: t }
        a.heartbeatInterval = setInterval(() => {
          if (a.heartbeatProps) {
            const p ={ ...s, ...a.heartbeatProps }
            a.track('Heartbeat', p)
          } else {
            a.track('Heartbeat', s)
          }
        }, t)
      } else {
        console.warn('已设置心跳')
      }
    }),
    (ThinkingDataAnalyticsLib.prototype.clearHeartbeat = function () {
      const a = this;
      if (a.heartbeatInterval) {
        clearInterval(a.heartbeatInterval)
        a.removeHeartbeatProps()
        a.heartbeatInterval = undefined
      } else {
        console.warn('未设置心跳')
      }
    }),
    (ThinkingDataAnalyticsLib.prototype.setHeartbeatProps = function (d) {
      if (!d) return
      if (typeof d !== "object" || Array.isArray(d)) {
        console.warn('心跳上报参数不符合规范')
        return
      }
      const a = this;
      if (!a.heartbeatProps) {
        a.heartbeatProps = {}
      }
      a.heartbeatProps = { ...a.heartbeatProps, ...d }
    }),
    (ThinkingDataAnalyticsLib.prototype.removeHeartbeatProps = function (d) {
      const a = this;
      if (!d) {
        a.heartbeatProps = {}
      } else if (typeof d === "string") {
        a.heartbeatProps[d] && delete a.heartbeatProps[d]
      } else if (Array.isArray(d)) {
        d.forEach(e => {
          a.heartbeatProps[e] && delete a.heartbeatProps[e]
        })
      } else {
        console.warn('删除心跳参数不符合规范')
      }
    }),
    (ThinkingDataAnalyticsLib.prototype.track = function (e, t, r, n) {
      const res =
        this._isCollectData() &&
        ((PropertyChecker.event(e) && PropertyChecker.properties(t)) ||
          !this._getConfig("strict")) &&
        this._sendRequest(
          {
            type: "track",
            event: e,
            time: _.check.isDate(r) ? r : new Date(),
            properties: t,
          },
          n
        );
      return res;
    }),
    (ThinkingDataAnalyticsLib.prototype.getTrackData = function (e, t, r, n) {
      const res =
        this._isCollectData() &&
        ((PropertyChecker.event(e) && PropertyChecker.properties(t)) ||
          !this._getConfig("strict")) &&
        this._sendRequest(
          {
            type: "track",
            event: e,
            time: _.check.isDate(r) ? r : new Date(),
            properties: t,
          },
          n,
          undefined,
          false
        );
      return res;
    }),
    (ThinkingDataAnalyticsLib.prototype.trackUpdate = function (e) {
      this._isCollectData() &&
      (_.check.isObject(e)
        ? ((PropertyChecker.event(e.eventName) &&
        PropertyChecker.properties(e.properties)) ||
        !this._getConfig("strict")) &&
        this._sendRequest(
          {
            type: "track_update",
            event: e.eventName,
            time: _.check.isDate(e.eventTime) ? e.eventTime : new Date(),
            properties: e.properties,
            extraId: e.eventId,
          },
          e.callback
        )
        : Log.e("trackUpdate 参数不符合要求"));
    }),
    (ThinkingDataAnalyticsLib.prototype.trackOverwrite = function (e) {
      this._isCollectData() &&
      (_.check.isObject(e)
        ? ((PropertyChecker.event(e.eventName) &&
        PropertyChecker.properties(e.properties)) ||
        !this._getConfig("strict")) &&
        this._sendRequest(
          {
            type: "track_overwrite",
            event: e.eventName,
            time: _.check.isDate(e.eventTime) ? e.eventTime : new Date(),
            properties: e.properties,
            extraId: e.eventId,
          },
          e.callback
        )
        : Log.e("trackOverwrite 参数不符合要求"));
    }),
    (ThinkingDataAnalyticsLib.prototype.trackFirstEvent = function (e) {
      this._isCollectData() &&
      (_.check.isObject(e)
        ? ((PropertyChecker.event(e.eventName) &&
        PropertyChecker.properties(e.properties)) ||
        !this._getConfig("strict")) &&
        this._sendRequest(
          {
            type: "track",
            event: e.eventName,
            time: _.check.isDate(e.eventTime) ? e.eventTime : new Date(),
            properties: e.properties,
            firstCheckId: e.firstCheckId || this.getDeviceId(),
          },
          e.callback
        )
        : Log.e("trackFirstEvent 参数不符合要求"));
    }),
    (ThinkingDataAnalyticsLib.prototype.trackWithBeacon = function (
      e,
      t,
      r,
      n
    ) {
      ((PropertyChecker.event(e) && PropertyChecker.properties(t)) ||
        !this._getConfig("strict")) &&
      this._sendRequest(
        {
          type: "track",
          event: e,
          time: _.check.isDate(r) ? r : new Date(),
          properties: t,
        },
        n,
        !0
      );
    }),
    (ThinkingDataAnalyticsLib.prototype.identify = function (e) {
      this._isCollectData() &&
      ("number" == typeof e && (e = String(e)),
        PropertyChecker.userId(e) || !this._getConfig("strict")
          ? e !== this.persistence.getDistinctId() &&
          this.persistence.setDistinctId(e)
          : Log.e("identify 的参数必须是字符串"));
    }),
    (ThinkingDataAnalyticsLib.prototype.getDistinctId = function () {
      return this.persistence.getDistinctId();
    }),
    (ThinkingDataAnalyticsLib.prototype.getDeviceId = function () {
      return this.persistence.getDeviceId();
    }),
    (ThinkingDataAnalyticsLib.prototype._isCollectData = function () {
      return (
        this.persistence.getOptTracking() &&
        this.persistence.getEnableTracking()
      );
    }),
    (ThinkingDataAnalyticsLib.prototype.setSuperProperties = function (e) {
      this._isCollectData() &&
      (PropertyChecker.propertiesMust(e) || !this._getConfig("strict")
        ? this.persistence.setSuperProperties(
          _.extend({}, this.getSuperProperties(), e)
        )
        : Log.w("setSuperProperties 参数不合法"));
    }),
    (ThinkingDataAnalyticsLib.prototype.getSuperProperties = function () {
      return this.persistence.getSuperProperties();
    }),
    (ThinkingDataAnalyticsLib.prototype.clearSuperProperties = function () {
      this._isCollectData() && this.persistence.setSuperProperties({});
    }),
    (ThinkingDataAnalyticsLib.prototype.unsetSuperProperty = function (e) {
      var t;
      this._isCollectData() &&
      _.check.isString(e) &&
      (delete (t = this.getSuperProperties())[e],
        this.persistence.setSuperProperties(t));
    }),
    (ThinkingDataAnalyticsLib.prototype.setDynamicSuperProperties = function (
      e
    ) {
      this._isCollectData() &&
      ("function" == typeof e
        ? PropertyChecker.properties(e()) || !this._getConfig("strict")
          ? (this.dynamicProperties = e)
          : Log.w("动态公共属性必须返回合法的属性值")
        : Log.w("setDynamicSuperProperties 的参数必须是 function 类型"));
    }),
    (ThinkingDataAnalyticsLib.prototype.timeEvent = function (e) {
      this._isCollectData() &&
      (_.check.isUndefined(e)
        ? Log.w("No event name provided to timeEvent")
        : this.persistence.setEventTimer(e, new Date().getTime()));
    }),
    (ThinkingDataAnalyticsLib.prototype.quick = function (e) {
      this._isCollectData() &&
      ("string" == typeof e && "autoTrack" === e
        ? this._sendRequest({
          type: "track",
          event: "ta_pageview",
          properties: _.info.pageProperties(),
        })
        : Log.w("quick方法中没有这个功能" + e));
    }),
    (ThinkingDataAnalyticsLib.prototype._setConfig = function (e) {
      _.check.isObject(e) &&
      (_.extend(this.config, e),
      this._getConfig("persistencePrefix") ||
      (this.config.persistencePrefix = this.config.cookiePrefix),
        this.persistence);
    }),
    (ThinkingDataAnalyticsLib.prototype._getConfig = function (e) {
      return this.config[e];
    }),
    (ThinkingDataAnalyticsLib.prototype.init = function (e) {
      var a = this;
      var t;
      _.check.isUndefined(this.config)
        ? ((this.config = {}),
            (this.currentProps = this.currentProps || {}),
            this._setConfig(_.extend({}, DEFAULT_CONFIG, e)),
            (this.persistence = new ThinkingDataPersistence(this.config)),
            (t = this._getConfig("appId")),
          _.check.isUndefined(t) ||
          this._setConfig({
            appId: t.replace(/\s*/g, ""),
          }),
            (Log.showLog = this._getConfig("showLog")),
            this._isDebug()
              ? this._setConfig({
                serverUrl: e.serverUrl + "/json",
              })
              : this._setConfig({
                serverUrl: e.serverUrl,
              }),
          this._isEncrypt() && this._setEncrypt()
        )
        : Log.i("The ThinkingData libraray has been initialized.");
    }),
    (ThinkingDataAnalyticsLib.prototype.initInstance = function (e, t) {
      if (
        !_.check.isString(e) ||
        (!_.check.isUndefined(t) && !_.check.isObject(t))
      )
        return (
          Log.w("invalid parameter of initInstance(string, object)."), null
        );
      if (this._getConfig("_name") !== MASTER_INSTANCE_NAME)
        return Log.w("This function is allowed for master instance only"), null;
      if (e === MASTER_INSTANCE_NAME || this[e])
        return (
          Log.w("The name ", e, " couldn't be used for create new instance."),
            null
        );
      _.check.isUndefined(t) && (t = {});
      var r = new ThinkingDataAnalyticsLib(),
        t = _.extend(
          {},
          this.config,
          {
            _name: e,
            persistenceEnabled: !1,
            uuid: this.getDeviceId(),
          },
          t
        );
      t.persistenceEnabled &&
      (t.persistencePrefix = t.persistencePrefix + "_" + e),
        r.init(t),
        (this[e] = r);
    }),
    (ThinkingDataAnalyticsLib.prototype.enableTracking = function (e) {
      "boolean" == typeof e && this.persistence.setEnableTracking(e);
    }),
    (ThinkingDataAnalyticsLib.prototype.optOutTracking = function () {
      this.persistence.setSuperProperties({}),
        this.persistence.setAccountId(""),
        this.persistence.clearEventTimer(),
        this.persistence.setOptTracking(!1);
    }),
    (ThinkingDataAnalyticsLib.prototype.optInTracking = function () {
      this.persistence.setOptTracking(!0);
    });
  var td = initAsModule();
  return td;
});
