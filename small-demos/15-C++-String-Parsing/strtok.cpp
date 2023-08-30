// C program for splitting a string
// using strtok()
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_TOKEN_LENGTH 3

int main()
{
    char str[] = "POST /x/y/z.html HTTP/1.1";
    
    char** token = (char**)malloc(sizeof(char *) * MAX_TOKEN_LENGTH);

    int token_index = 0;
    // Returns first token
    token[token_index] = strtok(str, " ");
 
    // Keep printing tokens while one of the
    // delimiters present in str[].
    while (token[token_index] != NULL && token_index < 3) {
        printf(" %s\n", token[token_index]);
        token[token_index+1] = strtok(NULL, " ");
        token_index += 1;
    } 
    
    if (strncmp(token[0], "POST", 3) == 0) {
      printf("First token is POST.\n");
    }
 
    if (strncmp(token[2], "HTTP", 4) == 0) {
      printf("Third token says HTTP version is %s\n", &(token[2][5]));
    }
    return 0;
}
