'use strict'
const objLogoutButton = new LogoutButton();

objLogoutButton.action = () =>{
    ApiConnector.logout(callback => { 
        if (callback.success){
            location.reload();
        }
    });
}



ApiConnector.current(callback => {
    if (callback.success){
        ProfileWidget.showProfile(callback.data);
    }
});



const objRatesBoard = new RatesBoard();

objRatesBoard.call = () =>{
    ApiConnector.getStocks(callback => {
        if (callback.success){
            objRatesBoard.clearTable();
            objRatesBoard.fillTable(callback.data);
        }
    });
}

setInterval(objRatesBoard.call(),60000);

const objMoneyManager = new MoneyManager();

objMoneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, callback => {
        if(callback.success){
            ProfileWidget.showProfile(callback.data);
            objMoneyManager.setMessage(true, 'Успешно');
        }else {
            objMoneyManager.setMessage(false, 'Ошибка')
        }
    });
}

objMoneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, callback => {
        if(callback.success){
            ProfileWidget.showProfile(callback.data);
            objMoneyManager.setMessage(true, 'Успешно');
        }else {
            objMoneyManager.setMessage(false, 'Ошибка')
        }
    });
}

objMoneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, callback => {
        if(callback.success){
            ProfileWidget.showProfile(callback.data);
            objMoneyManager.setMessage(true, 'Успешно');
        }else {
            objMoneyManager.setMessage(false, 'Ошибка')
        }
    });
}



const objFavoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(callback => {
    if (callback.success){
        objFavoritesWidget.clearTable();
        objFavoritesWidget.fillTable(callback.data);
        objMoneyManager.updateUsersList(callback.data);
    }
});


objFavoritesWidget.addUserCallback = (data) =>{
    ApiConnector.addUserToFavorites(data, callback => {
        if (callback.success){
            objFavoritesWidget.clearTable();
            objFavoritesWidget.fillTable(callback.data);
            objMoneyManager.updateUsersList(callback.data);
            objFavoritesWidget.setMessage(true, 'Успешно');
        }else {
            objFavoritesWidget.setMessage(false, 'Ошибка');
        }
    });

}

objFavoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, callback => {
        if (callback.success){
            objFavoritesWidget.clearTable();
            objFavoritesWidget.fillTable(callback.data);
            objMoneyManager.updateUsersList(callback.data);
            objFavoritesWidget.setMessage(true, 'Успешно');
        }else {
            objFavoritesWidget.setMessage(false, 'Ошибка');
        }
    });
}