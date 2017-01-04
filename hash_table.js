'use strict'

function HashTable(size, prime) {
    size = size || 59;
    prime = prime || 122611;
    this.arr = Array(size);
    this.prime = prime;
}

/*
  Given a key for the hashmap, compute the index to store our value.
  Specifically, this hash function will reduce a key to an integer, then
  multiplies it by this.prime, and finally returns
  (numKey * this.prime) % this.arr.length.

  For non-number keys this function transforms the key into a string,
  then computes the sum of the char-codes to transform that string
  into an integer. See test file function strToCharCode for that process.

  @param key - a value to be used as a key for our HashTable.
  @returns {number} - an integer value to be used as an index value for this.arr
*/
HashTable.prototype.__hashFunction = function(key) {

    var hash;
    var strToCharCode = function(str) {
        return str.split("").reduce(function(acc, el) {
            return acc + el.charCodeAt(0);
        }, 0);
    };
    if (typeof key === "number" && isNaN(key) === true) {
        key = "NaN";
        hash = (strToCharCode(key.toString()) * this.prime) % this.arr.length;
    } else if (Array.isArray(key)) {
        var stringArray;
        if (key.length === 0) {
            stringArray = "[]";
        } else {
            stringArray = "[";
        }
        key.forEach(function(element, index) {
            if (index === key.length - 1) {
                stringArray = stringArray + element.toString() + "]";
            } else {
                stringArray = stringArray + element.toString() + ",";
            }
        });
        key = stringArray;
        hash = (strToCharCode(key.toString()) * this.prime) % this.arr.length;
    } else if (typeof key === "object") {
        var stringObject = "{"
        var count = 0;
        for (var that in key) {
            stringObject = stringObject + ` ${that}: ${key[that]}, `;
            count++;
        }
        stringObject = stringObject + "}";
        key = stringObject;
        hash = (strToCharCode(key.toString()) * this.prime) % this.arr.length;
    } else if (typeof key === "number" && key !== Infinity) {
        hash = (key * this.prime) % this.arr.length;
    } else if (typeof key !== "number" || key === Infinity) {
        key = key.toString();
        hash = (strToCharCode(key.toString()) * this.prime) % this.arr.length;
    }
    return hash;
};

/*
  Given a key value pair, store it in the HashTable.

  @param key - a value to be used as a key for our HashTable.
  @param value - the data to be stored at the location for key.

  @returns undefined
*/
HashTable.prototype.set = function(key, value) {
    this.arr[key] = value;

};

/*
  Given a key, return the value associated with that key or undefined if that key
  does not exist in the HashTable.

  @param key - a value to be used as a key for our HashTable.

  @returns - the value associated with key, or undefined.
*/
HashTable.prototype.get = function(key) {
    return this.arr[key];
};

/*
  Given a key, return true if that key has a value associated with it in our
  HashTable, false otherwise.

  @param key - a value to be used as a key for our hash table.

  @returns true if the key has a value in our HashTable, false otherwise.
*/
HashTable.prototype.exists = function(key) {
    var doesExists = this.arr[key];
    if(doesExists){
        return true;
    }else{
        return false;
    }
};

/*
  Remove a value associated with a specific key from our HashTable.
  If a value was removed, return true if the value did not exist in
  the first place return false.

  @param key - a value to be used as a key for our hash table.

  @returns true if a value was removed, false otherwise.
*/
HashTable.prototype.remove = function(key) {
    var removeThis = this.arr[key];
    var value = this.arr[key];
    if(removeThis){
        this.arr[key] = null;
        return value;
    }else{
        return undefined;
    }
};

module.exports = HashTable;
