// find all prime numbers with the Sieve of Eratosthenes
function* sieve() {
    const primes = [2];
    yield 2;
  
    let i = 3;
    main: while (true) {
        let j = -1;
        while (++j < primes.length && primes[j] <= Math.sqrt(i)) {
            if (i % primes[j] === 0) {
                i += 2; continue main;
            }
        }

        primes.push(i);
        yield i;

        i += 2;
    }
}

// check if a number is palindromic
function is_palindrome(number) {
    const s = String(number);
  
    return s === s.split('').reverse().join('');
}

// find all the palindromic primes
function* palindromic_primes() {
    const s = sieve();
    while (true) {
        const prime = s.next().value;
        if (is_palindrome(prime)) yield prime;
    }
}

// generate the next `amount` of results from given generator.
function generate(func) {
    return amount => {
        let results = [];
        for (let i = 0; i < amount; i++)
            results.push(func.next().value);
        return results;
    }
}

(async () => {

    const next = generate(sieve());
  
    let element = document.body;
    let last = -1;
    const load_more = () => {
      for (let prime of next(20)) {
        let p = document.createElement('div');
        p.innerText = prime;
        if (is_palindrome(prime)) {
          p.classList.add('palindrome');
        }
        if (last == prime-2) {
          p.classList.add('twin');
          document.querySelector('main').lastChild.classList.add('twin');
        }
        if (Math.log2(prime+1)%1 == 0) {
          p.classList.add('mersenne');
        }
        last = prime;
        document.querySelector('main').appendChild(p);
      }
    }
    element.addEventListener('scroll', function() {
      if (element.scrollTop + element.clientHeight >= element.scrollHeight-10) {
        load_more();
      }
    });
    while (element.scrollTop + element.clientHeight >= element.scrollHeight-10) {
      load_more();
    }

})();










