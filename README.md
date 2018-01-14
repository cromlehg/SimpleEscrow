## Simple Escrow contract
### Схем работы:
* Как только заказчик заносит деньги на контракт, то его адрес запоминается и контракт начинает отсчитывать 12 дней
* Если разработчик вызывал failedByDeveloper, то деньги возвращаются заказчику
* По истечению 12 дней контракт отсчитывет период еще 5 дней. В течение этого периода заказчик должен принять решение. Если задача выполнена, то заказчик должен вызвать completed. Тогда средства перечисляются разработчику на кошелек. Если исполнение заказчика не устроило, то он должен вызвать orderNotAccepted. 
* Если работа не принята, то контракт дает еще 5 дней. 
* Если закзачик не принял никакого решения по истечению езопасного периода в пять дней, то работа считается выполненой и средства уходят разработчику на кошелек.

### Схема, когда возникает спор:
#### Условия возникновения спора
- Разработчик не вызвал failedByDeveloper, тем самым не сказав что работа не выполнена.
- Заказчик запрещает вывод средств в течение 5 днейвного периода с помощью orderNotAccepted. Контракт продляет безопасный период еще на пять дней.
#### Условия разрешения спора
* Разработчик вызвал failedByDeveloper. Тем самым разработчик согласился что работа не выполнена и средства уходят заказчику на кошелек, с которого пришли ранее.
* Заказчик вызвал completed. Тем самым согласившись что задача выполнена и средства уходят на кошелек разработчика.
* Заказчик не продлил спорный период до окончания текущего вызовом функции orderNotAccepted.

