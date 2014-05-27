var Attacklab = Attacklab || {};
Attacklab.showdown = Attacklab.showdown || {};
Attacklab.showdown.converter = function() {
	var a;
	var j;
	var A;
	var i = 0;
	this.makeHtml = function(H) {
		a = new Array();
		j = new Array();
		A = new Array();
		H = H.replace(/~/g, "~T");
		H = H.replace(/\$/g, "~D");
		H = H.replace(/\r\n/g, "\n");
		H = H.replace(/\r/g, "\n");
		H = "\n\n" + H + "\n\n";
		H = z(H);
		H = H.replace(/^[ \t]+$/mg, "");
		H = m(H);
		H = d(H);
		H = G(H);
		H = q(H);
		H = H.replace(/~D/g, "$$");
		H = H.replace(/~T/g, "~");
		return H
	};
	var d = function(H) {
			var H = H.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+)/gm, function(K, M, L, J, I) {
				M = M.toLowerCase();
				a[M] = h(L);
				if(J) {
					return J + I
				} else {
					if(I) {
						j[M] = I.replace(/"/g, "&quot;")
					}
				}
				return ""
			});
			return H
		};
	var m = function(J) {
			J = J.replace(/\n/g, "\n\n");
			var I = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del";
			var H = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math";
			J = J.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, x);
			J = J.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, x);
			J = J.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, x);
			J = J.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g, x);
			J = J.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, x);
			J = J.replace(/\n\n/g, "\n");
			return J
		};
	var x = function(H, I) {
			var J = I;
			J = J.replace(/\n\n/g, "\n");
			J = J.replace(/^\n/, "");
			J = J.replace(/\n+$/g, "");
			J = "\n\n~K" + (A.push(J) - 1) + "K\n\n";
			return J
		};
	var G = function(I) {
			I = f(I);
			var H = o("<hr />");
			I = I.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, H);
			I = I.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, H);
			I = I.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, H);
			I = E(I);
			I = b(I);
			I = u(I);
			I = m(I);
			I = g(I);
			return I
		};
	var r = function(H) {
			H = C(H);
			H = l(H);
			H = e(H);
			H = F(H);
			H = y(H);
			H = n(H);
			H = h(H);
			H = c(H);
			H = H.replace(/  +\n/g, " <br />\n");
			return H
		};
	var l = function(I) {
			var H = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
			I = I.replace(H, function(K) {
				var J = K.replace(/(.)<\/?code>(?=.)/g, "$1`");
				J = w(J, "\\`*_");
				return J
			});
			return I
		};
	var y = function(H) {
			H = H.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, D);
			H = H.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, D);
			H = H.replace(/(\[([^\[\]]+)\])()()()()()/g, D);
			return H
		};
	var D = function(N, T, S, R, Q, P, M, L) {
			if(L == undefined) {
				L = ""
			}
			var K = T;
			var I = S;
			var J = R.toLowerCase();
			var H = Q;
			var O = L;
			if(H == "") {
				if(J == "") {
					J = I.toLowerCase().replace(/ ?\n/g, " ")
				}
				H = "#" + J;
				if(a[J] != undefined) {
					H = a[J];
					if(j[J] != undefined) {
						O = j[J]
					}
				} else {
					if(K.search(/\(\s*\)$/m) > -1) {
						H = ""
					} else {
						return K
					}
				}
			}
			H = w(H, "*_");
			var U = '<a href="' + H + '"';
			if(O != "") {
				O = O.replace(/"/g, "&quot;");
				O = w(O, "*_");
				U += ' title="' + O + '"'
			}
			U += ">" + I + "</a>";
			return U
		};
	var F = function(H) {
			H = H.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, t);
			H = H.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, t);
			return H
		};
	var t = function(N, T, S, R, Q, P, M, L) {
			var K = T;
			var J = S;
			var I = R.toLowerCase();
			var H = Q;
			var O = L;
			if(!O) {
				O = ""
			}
			if(H == "") {
				if(I == "") {
					I = J.toLowerCase().replace(/ ?\n/g, " ")
				}
				H = "#" + I;
				if(a[I] != undefined) {
					H = a[I];
					if(j[I] != undefined) {
						O = j[I]
					}
				} else {
					return K
				}
			}
			J = J.replace(/"/g, "&quot;");
			H = w(H, "*_");
			var U = '<img class="thread_img" src="' + H + '" alt="' + J + '"';
			O = O.replace(/"/g, "&quot;");
			O = w(O, "*_");
			U += ' title="' + O + '"';
			U += " />";
			return U
		};
	var f = function(H) {
			H = H.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(I, J) {
				return o("<h1>" + r(J) + "</h1>")
			});
			H = H.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(J, I) {
				return o("<h2>" + r(I) + "</h2>")
			});
			H = H.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(I, L, K) {
				var J = L.length;
				return o("<h" + J + ">" + r(K) + "</h" + J + ">")
			});
			return H
		};
	var p;
	var E = function(I) {
			I += "~0";
			var H = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
			if(i) {
				I = I.replace(H, function(K, N, M) {
					var O = N;
					var L = (M.search(/[*+-]/g) > -1) ? "ul" : "ol";
					O = O.replace(/\n{2,}/g, "\n\n\n");
					var J = p(O);
					J = J.replace(/\s+$/, "");
					J = "<" + L + ">" + J + "</" + L + ">\n";
					return J
				})
			} else {
				H = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;
				I = I.replace(H, function(L, P, N, K) {
					var O = P;
					var Q = N;
					var M = (K.search(/[*+-]/g) > -1) ? "ul" : "ol";
					var Q = Q.replace(/\n{2,}/g, "\n\n\n");
					var J = p(Q);
					J = O + "<" + M + ">\n" + J + "</" + M + ">\n";
					return J
				})
			}
			I = I.replace(/~0/, "");
			return I
		};
	p = function(H) {
		i++;
		H = H.replace(/\n{2,}$/, "\n");
		H += "~0";
		H = H.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function(K, M, L, J, I) {
			var O = I;
			var N = M;
			var P = L;
			if(N || (O.search(/\n{2,}/) > -1)) {
				O = G(s(O))
			} else {
				O = E(s(O));
				O = O.replace(/\n$/, "");
				O = r(O)
			}
			return "<li>" + O + "</li>\n"
		});
		H = H.replace(/~0/g, "");
		i--;
		return H
	};
	var b = function(H) {
			H += "~0";
			H = H.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(I, K, J) {
				var L = K;
				var M = J;
				L = v(s(L));
				L = z(L);
				L = L.replace(/^\n+/g, "");
				L = L.replace(/\n+$/g, "");
				L = "<pre><code>" + L + "\n</code></pre>";
				return o(L) + M
			});
			H = H.replace(/~0/, "");
			return H
		};
	var o = function(H) {
			H = H.replace(/(^\n+|\n+$)/g, "");
			return "\n\n~K" + (A.push(H) - 1) + "K\n\n"
		};
	var C = function(H) {
			H = H.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(K, M, L, J, I) {
				var N = J;
				N = N.replace(/^([ \t]*)/g, "");
				N = N.replace(/[ \t]*$/g, "");
				N = v(N);
				return M + "<code>" + N + "</code>"
			});
			return H
		};
	var v = function(H) {
			H = H.replace(/&/g, "&amp;");
			H = H.replace(/</g, "&lt;");
			H = H.replace(/>/g, "&gt;");
			H = w(H, "*_{}[]\\", false);
			return H
		};
	var c = function(H) {
			H = H.replace(/(\*\*|__)(?=\S)([^\r]*?\S[\*_]*)\1/g, "<strong>$2</strong>");
			H = H.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>");
			return H
		};
	var u = function(H) {
			H = H.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(I, J) {
				var K = J;
				K = K.replace(/^[ \t]*>[ \t]?/gm, "~0");
				K = K.replace(/~0/g, "");
				K = K.replace(/^[ \t]+$/gm, "");
				K = G(K);
				K = K.replace(/(^|\n)/g, "$1  ");
				K = K.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(L, M) {
					var N = M;
					N = N.replace(/^  /mg, "~0");
					N = N.replace(/~0/g, "");
					return N
				});
				return o("<blockquote>\n" + K + "\n</blockquote>")
			});
			return H
		};
	var g = function(N) {
			N = N.replace(/^\n+/g, "");
			N = N.replace(/\n+$/g, "");
			var M = N.split(/\n{2,}/g);
			var J = new Array();
			var H = M.length;
			for(var I = 0; I < H; I++) {
				var L = M[I];
				if(L.search(/~K(\d+)K/g) >= 0) {
					J.push(L)
				} else {
					if(L.search(/\S/) >= 0) {
						L = r(L);
						L = L.replace(/^([ \t]*)/g, "<p>");
						L += "</p>";
						J.push(L)
					}
				}
			}
			H = J.length;
			for(var I = 0; I < H; I++) {
				while(J[I].search(/~K(\d+)K/) >= 0) {
					var K = A[RegExp.$1];
					K = K.replace(/\$/g, "$$$$");
					J[I] = J[I].replace(/~K\d+K/, K)
				}
			}
			return J.join("\n\n")
		};
	var h = function(H) {
			H = H.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
			H = H.replace(/<(?![a-z\/?\$!])/gi, "&lt;");
			return H
		};
	var e = function(H) {
			H = H.replace(/\\(\\)/g, k);
			H = H.replace(/\\([`*_{}\[\]()>#+-.!])/g, k);
			return H
		};
	var n = function(H) {
			H = H.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi, '<a href="$1">$1</a>');
			H = H.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, function(I, J) {
				return B(q(J))
			});
			return H
		};
	var B = function(J) {
			function I(L) {
				var K = "0123456789ABCDEF";
				var M = L.charCodeAt(0);
				return(K.charAt(M >> 4) + K.charAt(M & 15))
			}
			var H = [function(K) {
				return "&#" + K.charCodeAt(0) + ";"
			}, function(K) {
				return "&#x" + I(K) + ";"
			}, function(K) {
				return K
			}];
			J = "mailto:" + J;
			J = J.replace(/./g, function(K) {
				if(K == "@") {
					K = H[Math.floor(Math.random() * 2)](K)
				} else {
					if(K != ":") {
						var L = Math.random();
						K = (L > 0.9 ? H[2](K) : L > 0.45 ? H[1](K) : H[0](K))
					}
				}
				return K
			});
			J = '<a href="' + J + '">' + J + "</a>";
			J = J.replace(/">.+:/g, '">');
			return J
		};
	var q = function(H) {
			H = H.replace(/~E(\d+)E/g, function(I, K) {
				var J = parseInt(K);
				return String.fromCharCode(J)
			});
			return H
		};
	var s = function(H) {
			H = H.replace(/^(\t|[ ]{1,4})/gm, "~0");
			H = H.replace(/~0/g, "");
			return H
		};
	var z = function(H) {
			H = H.replace(/\t(?=\t)/g, "    ");
			H = H.replace(/\t/g, "~A~B");
			H = H.replace(/~B(.+?)~A/g, function(I, L, K) {
				var N = L;
				var J = 4 - N.length % 4;
				for(var M = 0; M < J; M++) {
					N += " "
				}
				return N
			});
			H = H.replace(/~A/g, "    ");
			H = H.replace(/~B/g, "");
			return H
		};
	var w = function(L, I, J) {
			var H = "([" + I.replace(/([\[\]\\])/g, "\\$1") + "])";
			if(J) {
				H = "\\\\" + H
			}
			var K = new RegExp(H, "g");
			L = L.replace(K, k);
			return L
		};
	var k = function(H, J) {
			var I = J.charCodeAt(0);
			return "~E" + I + "E"
		}
};
var Showdown = Attacklab.showdown;
if(Attacklab.fileLoaded) {
	Attacklab.fileLoaded("showdown.js")
};