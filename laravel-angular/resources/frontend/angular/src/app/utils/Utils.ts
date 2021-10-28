/**
 * Return a greeting according to the time of day (eg good morning or good evening)
 * @param name optional, if the parameter is passed then the name will be added to the blessing
 */
export function getGreeting(name: String = ""): string {
  let hours = new Date().getHours()
  let postfix = name === "" ? "" : " " + name + "!";
  if (hours < 5)
    return "לילה טוב" + postfix
  if (hours < 12)
    return "בוקר טוב" + postfix
  if (hours < 16)
    return "צהריים טובים" + postfix
  if (hours < 18)
    return "אחר צהריים טובים" + postfix
  if (hours < 22)
    return "ערב טוב" + postfix
  return "לילה טוב" + postfix
}


/**
 * Returns a longer greeting, regardless of the user's name or the time
 */
export function getExtraGreeting(): string {
  let greetings = ["מה שלומך היום?", "איך עובר עליך היום?", "כיף שחזרת!"]
  let index = Math.floor(Math.random() * greetings.length);
  return greetings[index]
}


/**
 * Convert a nested object to a single-level object.
 * Array values will become one string separated by '\n'.
 * @param obj the object needs to be flattened
 * @param convertToObject optional, whether to return the result as an array of pairs or as a regular object (the
 * default is a regular object)
 */
export function flatObject(obj: object, convertToObject: boolean = true): object[] | object {
  let result = []
  for (let [key, val] of Object.entries(obj)) {
    if (val instanceof Array)
      result.push([key, val.join('\n')])
    else if (val instanceof Object)
      // @ts-ignore
      result.push(...flatObject(val, false))
    else
      result.push([key, val])
  }

  return convertToObject ? listToObject(result) : result
}


/**
 * Convert list of pairs to object
 * @param list list of <key, value> pairs
 */
export function listToObject(list: any[]): object {
  return list.reduce((map: object, item) => {
    // @ts-ignore
    map[item[0]] = item[1];
    return map;
  }, {})
}


/**
 * A function that performs English-Hebrew translation of predefined expressions.
 * In case there is no suitable translation the function will return the original expression without translation.
 * @param expression any expression in Hebrew
 */
export function translationOf(expression: string): string {
  const dictionary = {
    'action': 'פעולות',
    'name': 'שם',
    'county': 'מחוז',
    'emails': 'אימיילים',
    'street': 'רחוב',
    'city': 'עיר',
    'number': 'מספר',
    'convenience stores': 'חנויות נוחות',
    'kitchens': 'מטבחים',
    'rabbinate': 'רבנות',
    'restaurants': 'מסעדות'
  }

  // @ts-ignore
  return dictionary[expression] || expression
}
