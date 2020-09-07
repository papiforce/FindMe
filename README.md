# FindMe

## Serveur

### Installez les dépendances (depuis le terminal):  
> cd back  
> npm install   

*Vous pouvez à présent lancer le serveur*

> npm start

*Vous pouvez à présent créer le compte administrateur*

### Créer un compte administrateur avec Postman:
> Method: POST  
> Url: http://localhost:4000/users/register  
> Data:  
> {  
>   "username": votre pseudo,  
>   "email": votre email,  
>   "password": votre mot de passe,  
>   "role": "SUPER_ADMIN"  
> }  

## Client

> cd front  
> npm start
