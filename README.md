# Ironhack Web Dev Course Pre-work JS Mars Rover by LsM

## Configurações

1- Configurando o Grid:

##### O grid assume o tamanho que for configurado, nas linhas 2 e 3.

2- Configurando os Obstáculos:

##### Para configurar os obstáculos basta indicar a posição deles no grid, com coordenadas [x,y], na linha 6. 

3- Configurando os Rovers:

##### Os rovers são configurados com a posição inicial, nome e a direção inicial, partir da linha 13.

4- Enviando comandos para um rover qualquer:
```js
executeCommands(string de comando, rover);
```
##### Verificar exemplos na linha 45 a 47.


#### Obs.: Os comando aceitos são: 
* F ou f -> Anda para frente;
* B ou b -> Anda de tras;
* L ou l -> Vira para esquerda;
* R ou r -> Vira para direita;
