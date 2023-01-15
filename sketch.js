// jshint esversion: 11

const { next_prime, is_prime } = (() => {
  let primes = [];
  let prime_hash = {};
  
  let current = 2;
  let index = 0;
  const generate = () => {
    main: while (true) {
      for (let prime of primes) {
        if (prime > Math.sqrt(current)) break;
        if (current % prime == 0) {
          current++;
          continue main;
        }
      }

      primes.push(current);
      prime_hash[current] = true;
      index++;
      return current++;
    }
  };
  
  const next_prime = () => {
    if (index < primes.length) return primes[index++];
    return generate();
  };
  
  const is_prime = (number) => {
    while (primes[primes.length-1] < number) generate();
    return !!prime_hash[number];
  }
  
  return {
    next_prime,
    is_prime
  };
})();

// check if a number is palindromic
const is_palindrome = (number) => {
    const s = String(number);
    return s === s.split('').reverse().join('');
}

// generate the next `amount` of results from given generator.
const generate = (func) => amount => {
  let results = [];
  for (let i = 0; i < amount; i++)
    results.push(func());
  return results;
}

(async () => {

    const next = generate(next_prime);
  
    const load_more = () => {
      for (let prime of next(10)) {
        let p = document.createElement('div');
        p.innerText = prime;
        if (is_palindrome(prime)) {
          p.classList.add('palindrome');
        }
        if (is_prime(prime-2) || is_prime(prime+2)) {
          p.classList.add('twin');
        }
        // if (is_prime(prime-6) || is_prime(prime+6)) {
        //   p.classList.add('sexy');
        // }
        if (Math.log2(prime+1)%1 == 0) {
          p.classList.add('mersenne');
        }
        $('main').appendChild(p);
      }
    }
    const body = $('body');
    body.on('scroll', async () => {
      // $('div#padtop').style.height = body.scrollTop;
      let last = performance.now();
      while (body.scrollTop + body.clientHeight > body.scrollHeight-5*innerHeight) {
        load_more();
        if (performance.now() - last > 1000/70) {
          await frame();
          last = performance.now();
        }
      }
    }); $('body').trigger('scroll');

})();









