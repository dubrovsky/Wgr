package com.bivc.cimsmgs.commons;

import java.util.TreeMap;

import static org.apache.commons.lang3.StringUtils.isBlank;

public class Validators {

    private static final int[] mulNvag = new int[] {2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2};

    public static boolean checkVagNumber(String nvag) {
        if (isBlank(nvag))
            return false;

        int len = nvag.length();
        if (len != 8 && len != 12)
            return false;

        int[] multArr = new int[len - 1];

        char[] chars = nvag.toCharArray();
        for (int i = 0; i < multArr.length; i++) {
            multArr[i] = Character.getNumericValue(chars[i]) * mulNvag[i];
            if (multArr[i] > 9) { // оставляем только одну цифру эквивалентную сумме двух
                multArr[i] -= 9;
            }
        }

        int sum = 0;
        for (int i : multArr) {
            sum += i;
        }

        int nearest10 = (sum + 9) / 10  * 10;
        int checkMark = nearest10 - sum;
        @SuppressWarnings("UnnecessaryLocalVariable")
        boolean res = checkMark == Character.getNumericValue(chars[len - 1]);
        return res;
    }

    private static final int[] mulNkon = new int[] {1, 2, 4, 8, 16 ,32, 64 ,128 ,256 ,512};
    private static final TreeMap<Character, Integer> eqMap = new TreeMap<>();
    static {
        eqMap.put('A', 10);
        eqMap.put('B', 12);
        eqMap.put('C', 13);
        eqMap.put('D', 14);
        eqMap.put('E', 15);
        eqMap.put('F', 16);
        eqMap.put('G', 17);
        eqMap.put('H', 18);
        eqMap.put('I', 19);
        eqMap.put('J', 20);
        eqMap.put('K', 21);
        eqMap.put('L', 23);
        eqMap.put('M', 24);
        eqMap.put('N', 25);
        eqMap.put('O', 26);
        eqMap.put('P', 27);
        eqMap.put('Q', 28);
        eqMap.put('R', 29);
        eqMap.put('S', 30);
        eqMap.put('T', 31);
        eqMap.put('U', 32);
        eqMap.put('V', 34);
        eqMap.put('W', 35);
        eqMap.put('X', 36);
        eqMap.put('Y', 37);
        eqMap.put('Z', 38);
    }

    public static boolean checkKontNumber(String nkon) {
        if (isBlank(nkon) || nkon.length() != 11)
            return false;

        int sum = 0;
        char[] chars = nkon.toCharArray();
        for (int i = 0; i < 4 ; i++) {
            sum += eqMap.get(Character.toUpperCase(chars[i])) * mulNkon[i];
        }
        for (int i = 4; i < 10; i++) {
            sum += Character.getNumericValue(chars[i]) * mulNkon[i];
        }

        int checkMark = sum % 11 % 10;
        @SuppressWarnings("UnnecessaryLocalVariable")
        boolean res = checkMark == Character.getNumericValue(chars[10]);
        return res;
    }
}
