![header](https://capsule-render.vercel.app/api?type=wave&color=auto&height=300&section=header&text=Ahyeon%20Gil&fontSize=90&animation=fadeIn&fontAlignY=38)

<h2 align='center'>π μλνμΈμ? μ λ μ΄λΈλΈνμ CTOμλλ€.π</h2>
<h3 align='center'>π  Tech Stack π </h3>
<p align='center'>
  <img src="https://img.shields.io/badge/Javascript-ffb13b?style=flat-square&logo=javascript&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white"/></a>&nbsp

> νλ‘μ νΈλ₯Ό μ§ννλ©΄μ κ°μΈ κ³΅λΆ ν μλ£λ₯Ό λ¨κΈ°κΈ° μν λͺ©μ μΌλ‘ μμ±νμ΅λλ€.



### Debounce

μ λ μΉ΄ κΈ°λ₯μμ λ²νΌμ λλ₯Ό λλ§λ€ λ¬Όκ²°μ μ§μ°λ ν¨μκ° λλ¬΄ λΉ¨λ¦¬, λλ¬΄ λ§μ΄ νΈμΆλλ κ²μ λ§κ³ μ κ³΅λΆνκ² λμμ΅λλ€. `onClick`, `onMouseDown`μ΄λ `onScroll`κ³Ό κ°μ μ΄λ²€νΈ νΈλ€λ¬λ₯Ό μ¬μ©ν  λ μ½λ°± ν¨μκ° μ€νλλ μλλ₯Ό λ€μμ λ°©λ²μΌλ‘ μ μ΄ν  μ μμ΅λλ€.

- `throttling` : μκ° κΈ°λ° λΉλμ λ°λ₯Έ λ³κ²½ μνλ§(ν¨μκ° μ£Όμ΄μ§ μκ° λμμ ν λ² μ΄μ νΈμΆλλ κ²μ λ§μ΅λλ€.)
- `debouncing` : λΉνμ± μ£ΌκΈ° μ΄νμ λ³κ²½ μ μ©(ν¨μκ° λ§μ§λ§μΌλ‘ νΈμΆλ ν νΉμ  μκ°κΉμ§ μ€νλμ§ μλλ‘ ν΄μ€λλ€.)

λ¬Όκ²°μ΄ νΌμ§λ μ λλ©μ΄μμ μ§μ°λ ν¨μλ₯Ό μΌμ  μκ° λ§κΈ°μν΄ debouncingμ μ μ©νμ΅λλ€. λ€μ νλ‘μ νΈ λμλ APIμμ²­κ³Ό κ°μ λΉμΌ κ³μ°μ μνν  λ μμ©ν΄ λ³΄λ©΄ μ’μ κ² κ°μ΅λλ€.

```js
const useDebouncedRippleCleanUp = (rippleCount, duration, cleanUpFunction) => {
  useLayoutEffect(() => {
    let bounce = null;
    if (rippleCount > 0) {
      clearTimeout(bounce);
      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce);
      }, duration * 2);
    }
    return () => clearTimeout(bounce);
  }, [rippleCount, duration, cleanUpFunction]);
};

const ShoutPage = () => {
  useDebouncedRippleCleanUp(ripples.length, 1000, () => {
    setRipples([]);
    setMyNeighbor([]);
  });
    
    ...
    
```
μ¬κΈ°μμ `setTimeout`μ μΌμ  μκ°μ΄ μ§λ νμ ν¨μκ° μ€νλλλ‘ μ²λ¦¬νλ μ­ν μ νλ©°, `clearTimeout`μ setTimeoutμ μ·¨μνλ μ­ν μ ν©λλ€.

- μ°Έκ³  : [React κ³΅μ λ¬Έμ : μ»΄ν¬λνΈμ ν¨μ μ λ¬νκΈ°](https://ko.reactjs.org/docs/faq-functions.html)

## Geohash

μ λ μΉ΄μμ λ΄ μ£Όλ³ μμΉμ μ μ λ€κ³Ό μν΅νκΈ° μν΄ Geohashλ₯Ό μ¬μ©νμ΅λλ€.

μ§μ€ν΄μλ₯Ό μ­μ§ κ²½μλλ‘ μλμ κ°μ λ¬Έμλ§΅μ μ¬μ©νμ¬ 32μ§λ²μΌλ‘ ν΄μκ°μ ν΄μν  μ μμ΅λλ€.

| Decimal | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | 10   | 11   | 12   | 13   | 14   | 15   |
| :-----: | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| Base 32 | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | b    | c    | d    | e    | f    | g    |
|         |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| Decimal | 16   | 17   | 18   | 19   | 20   | 21   | 22   | 23   | 24   | 25   | 26   | 27   | 28   | 29   | 30   | 31   |
| Base 32 | h    | j    | k    | m    | n    | p    | q    | r    | s    | t    | u    | v    | w    | x    | y    | z    |

ezs42λΌλ Geohash κ°μ΄ μλ€κ³  νλ©΄ μλ νμ μν΄μ "**01101 11111 11000 00100 00010**"λ‘ ννμ΄ λ©λλ€.  

κ·ΈλΌ κ°μ₯ μΌμͺ½μ μλ 0λΆν° μμν΄μ λμΉΈμ© μ€λ₯Έμͺ½ μ΄λνλ©΄μ concatνλ©΄ 011...μ΄ λμ€κ³  μ΄ κ°μ κ²½λ, κ°μ₯ μΌμͺ½μ μλ 0μμ νμΉΈ μμ μλ 1λΆν° μμν΄μ λμΉΈμ© μ€λ₯Έμͺ½ μ΄λνλ©΄μ concatνλ©΄ 101...μ΄ λμ€κ³  μ΄ κ°μ μλκ° λ©λλ€.  

κ²½λλ 0111110000000, μλλ 101111001001μλλ€. 

bit|min|mid|max|val|err1
-|-|-|-|-|-
1|90.000 |0.000|90.000|45.000|45.000
0|0.000 |45.000|90.000|22.500|22.500
1|0.000 |22.500|45.000|33.750|11.250
1|22.500 |33.750|45.000|39.375|5.625
...|... |...|...|...|...

μΆμ²: https://www.internetmap.kr/entry/geohash [κ³΅κ°μ λ³΄μ μΈν°λ·μ§λ]

μ΄κ²μ μΌμͺ½μμ μ€λ₯Έμͺ½μΌλ‘ μ½μ΄κ°λ©΄μ λ²μλ₯Ό μ’νκ°λ κ³Όμ μ μ§νν©λλ€. μλλ₯Ό μλ₯Ό λ€μ΄λ³΄λ©΄ 1μ΄λ©΄ μ€λ₯Έμͺ½, 0μ΄λ©΄ μΌμͺ½μ μ νν΄μ λ²μλ₯Ό μ’νκ°λλ€. μλλ μ²μ μμν λ -90 ~ +90μλλ€. λΉνΈκ°μ΄ 0μ΄λ©΄ -90 ~ 0, 1μ΄λ©΄ 0 ~ +90μ΄ λ©λλ€.



μ°Έκ³ : [μ‘°κΈνμ§λ§κ³  μ²μ²ν](https://dol9.tistory.com/234 )

μ°Έκ³  : [κ³΅κ°μ λ³΄μ μΈν°λ·μ§λ](https://www.internetmap.kr/entry/geohash)



```js
const base32 = '0123456789bcdefghjkmnpqrstuvwxyz';
/**
 * μ£Όμ΄μ§ λ°©ν₯(direction)μΌλ‘ μΈμ ν cell λ°ν
 * geohash - μ€μ¬μ΄ λλ cell
 * direction - geohashμμμ λ°©ν₯ (N/S/E/W).
 * @returns {string} Geocode of adjacent cell.
 */
function adjacent(geohash, direction) {
    geohash = geohash.toLowerCase();
    direction = direction.toLowerCase();

    if (geohash.length == 0) throw new Error('Invalid geohash');
    if ('nsew'.indexOf(direction) == -1) throw new Error('Invalid direction');

    const neighbour = {
        n: [ 'p0r21436x8zb9dcf5h7kjnmqesgutwvy', 'bc01fg45238967deuvhjyznpkmstqrwx' ],
        s: [ '14365h7k9dcfesgujnmqp0r2twvyx8zb', '238967debc01fg45kmstqrwxuvhjyznp' ],
        e: [ 'bc01fg45238967deuvhjyznpkmstqrwx', 'p0r21436x8zb9dcf5h7kjnmqesgutwvy' ],
        w: [ '238967debc01fg45kmstqrwxuvhjyznp', '14365h7k9dcfesgujnmqp0r2twvyx8zb' ],
    };
    
    const border = {
        n: [ 'prxz',     'bcfguvyz' ],
        s: [ '028b',     '0145hjnp' ],
        e: [ 'bcfguvyz', 'prxz'     ],
        w: [ '0145hjnp', '028b'     ],
    };

    const lastCh = geohash.slice(-1);    // last character of hash
    let parent = geohash.slice(0, -1); // hash without last character

    const type = geohash.length % 2;

    // check for edge-cases which don't share common prefix
    if (border[direction][type].indexOf(lastCh) != -1 && parent != '') {
        parent = adjacent(parent, direction);
    }

    // append letter for direction to parent
    return parent + base32.charAt(neighbour[direction][type].indexOf(lastCh));
}


/*
 @returns {{n,ne,e,se,s,sw,w,nw: string}}
 */
export function neighbours(geohash) {
    return [
        geohash,
        adjacent(geohash, 'n'),
        adjacent(adjacent(geohash, 'n'), 'e'),
        adjacent(geohash, 'e'),
        adjacent(adjacent(geohash, 's'), 'e'),
        adjacent(geohash, 's'),
        adjacent(adjacent(geohash, 's'), 'w'),
        adjacent(geohash, 'w'),
        adjacent(adjacent(geohash, 'n'), 'w'),
    ];
}
```

- μ°Έκ³  : [movable type](https://www.movable-type.co.uk/scripts/geohash.html)



## Firestore

Cloud Firestoreλ ν΄λΌμ°λμ νΈμ€νλλ NoSQL λ°μ΄ν°λ² μ΄μ€ μλΉμ€μλλ€. κ°νΈνκ² μ¬μ©ν  μ μλ ννν μΏΌλ¦¬λ₯Ό μ§μνκ³ , μ€μκ° λ¦¬μ€λλ₯Ό μΆκ°νλ©΄ μλ°μ΄νΈκ° λ°μν  λλ§λ€ μ± λ°μ΄ν°λ₯Ό μ΅μ  μνλ‘ μ μ§ν  μ μμ΅λλ€. λ°λΌμ μ μ κ°μ μνΈμμ©μ΄ νμν μ μ¬ μ±ν μλΉμ€μΈ μ λ μΉ΄λ₯Ό κ΅¬ννκΈ° μν΄ μ¬μ©νμ΅λλ€.

#### μ΄κΈ°ν

νλ‘μ νΈμ λ€μ μ½λλ₯Ό μΆκ°νμ¬ firestore μΈμ€ν΄μ€λ₯Ό μ΄κΈ°ν ν΄μ€λλ€.

```js
import firebase from "firebase/app";
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});

var db = firebase.firestore();
```

#### λ°μ΄ν°μΆκ°

- λ¨μΌ λ¬Έμλ₯Ό λ§λ€κ±°λ λ?μ΄μ°λ €λ©΄ `set()`μ μ¬μ©ν©λλ€. `set()`μ λ¬Έμκ° μμΌλ©΄ μλ‘ λ§λ€κ³  μμΌλ©΄ μλ‘ μ κ³΅ν λ΄μ©μ λ?μ΄μλλ€. `set()`μ μ¬μ©ν΄μ λ¬Έμλ₯Ό λ§λ€ λλ λ§λ€ λ¬Έμμ IDλ₯Ό μ§μ ν΄μΌ ν©λλ€. μλ μμμμ  Emailμ IDλ‘ μ¬μ©νμ΅λλ€.
- κ·Έλ¬λ λ¬Έμμ μ μλ―Έν IDλ₯Ό λμ§ μκ³  μλμΌλ‘ μμ±λλλ‘ ν  λμλ `add()`λ₯Ό νΈμΆνλ©΄ λ©λλ€. 

```js
const data = {
  nickname: Nickname,
  avatar: avatarId,
  lat: lat, //y
  lng: lng, //x
  geohash: geofire.geohashForLocation([lat, lng]).substring(0, 5),
};
firestore.collection("users").doc(Email).set(data);
```

- μ μ²΄ λ¬Έμλ₯Ό λ?μ΄μ°μ§ μκ³  λ¬Έμμ μΌλΆ νλλ₯Ό μλ°μ΄νΈνλ €λ©΄ `update()`λ₯Ό μ¬μ©ν©λλ€.

```js
const data = {
  nickname: nickname,
  avatar: avatarId,
};
firestore.collection("users").doc(userEmail).update(data);
```

- λ¬Έμκ° μμ±λλ μκ°μ νμμ€ν¬νλ‘ μ€μ ν  μ μμ΅λλ€.

```js
const data = {
    geohash: pos,
    message: {
        content: myMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    },
};
firestore.collection("users").doc(userEmail).update(data);
```

- λ¬Έμμ νΉμ  νλλ₯Ό μ­μ νλ €λ©΄ λ¬Έμλ₯Ό μλ°μ΄νΈν  λ `FieldValue.delete()`λ₯Ό μ¬μ©ν©λλ€.

```js
var userRef = firestore.collection("users").doc(userEmail);
userRef.update({
    message: firebase.firestore.FieldValue.delete(),
});
```



- μ°Έκ³  : [Firebase κ³΅μλ¬Έμ](https://firebase.google.com/docs/firestore?hl=ko)