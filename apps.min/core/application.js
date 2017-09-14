/**
 * Table of contents: 
 * ext-all.js
 * Constants.js
 * Module.js
 * Widget.js
 * LoadingBox.js
 * MessageBox.js
 * Application.js
 * Desktop.js
 * TaskBar.js
 * TrayClock.js
 * Wallpaper.js
 * WallpaperModal.js
 * StartMenu.js
 * AboutModal.js
 * ShortcutModel.js
 * WallpaperModel.js
 * Application.js
 * boot.js
 * Generated: 2017-09-14 09:06:24
 */


/* Filename: ext-all.js */
/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/

/* Filename: Constants.js */
/**
 * @class ExtApp.Constants
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 * Description
 * All Constant variables
 *
 **/
 
Ext.define("ExtApp.core.Constants",{
	alternateClassName			: "ExtApp.Constants" ,
	singleton					: true,
	
	/*APP INFO*/
	APP_NAME					: programName,
	APP_VERSION					: programVersion,
	APP_RELEASE					: '&copy; '+programRelease,
	
	/* login url */
	DESKTOP_CONFIGURATION_URL	: ExtApp.BASE_PATH+"backend/config",
	DESKTOP_LOGIN_URL			: ExtApp.BASE_PATH+"login",
	DESKTOP_LOGOUT_URL			: ExtApp.BASE_PATH+"logout",
	DESKTOP_HOME_URL			: ExtApp.BASE_PATH+"backend/",
	
	/* The directory where the avatars are */
	USERS_AVATAR_PATH			: ExtApp.BASE_PATH+"assets/resources/avatars/",
	WALLPAPER_PATH				: ExtApp.BASE_PATH+"assets/desktop/wallpapers/",
	WALLPAPER_ASSET_PATH		: "assets/desktop/wallpapers/",
	WALLPAPER_DEFAULT			: "default.jpg",
	
	/* The directory where the JS's are*/
	JS_PATH						: ExtApp.BASE_PATH+"assets/js/",
	
	/* Default width and height for windows */
	DEFAULT_WINDOW_WIDTH		: 800,
	DEFAULT_WINDOW_HEIGHT		: 480,
	
	LOGIN_IMAGE					: ExtApp.BASE_PATH+"assets/resources/images/login-image.jpg"
	
});

/* Filename: Module.js */
/**
 * @class ExtApp.core.Module
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Fri Jul 29 10:15:49 CDT 2011
 *
 * Description
 * Core Module
 *
 **/

Ext.define('ExtApp.core.Module', {
    mixins: {
        observable: 'Ext.util.Observable'
    },
	constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
        this.init();
    },
    init: Ext.emptyFn
	
});


/* Filename: Widget.js */
/**
 * @class ExtApp.core.Widget
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Fri Jul 29 10:15:49 CDT 2011
 *
 * Description
 * Core Widget
 *
 **/

Ext.define('ExtApp.core.Widget', {
    mixins: {
        observable: 'Ext.util.Observable'
    },
	constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
        this.init();
    },
    init: Ext.emptyFn
	
});


/* Filename: LoadingBox.js */
/**
 * @class ExtApp.core.LoadingBox
 * @extends Ext.core.Module
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Sun Jul 10 21:04:35 CDT 2011
 *
 * Description
 * Core LoadingBox Controller
 *
 **/

Ext.define("ExtApp.core.LoadingBox",{
	extend: 'ExtApp.core.Module',
	id:'core-loading-box',
	init : function(){
        //this.launcher = {
        //    text: 'Loading',
        //    iconCls:'icon-grid'
        //};
    },
	inSuspend: [],
	dtMaxSuspend: [],
	checkSuspendTime: [],
	createWindow : function(getData){
		//default data
		var dataDefault = {
			scope: '',
			title: 'Loading',
			msg:'Load Data',
			suspendOn: true,
			maxSuspend: 8000,
			data: [],
			type: 'progress',
			modal: false
		};
		
		var data = Ext.Object.merge(dataDefault,getData);		
		var me = data.scope;
				
        if(data.suspendOn){
			Ext.Array.push(this.inSuspend, me.id);
			var newDt = this.dtMaxSuspend;
			newDt[me.id] =  data.maxSuspend;
			this.dtMaxSuspend = newDt;
		}
		
		var desktop = me.app.getDesktop();
        var win = me.app.getDesktop().getWindow(me.id+'-loadingbox');
		if(!win){
			win = desktop.createWindow({
				id: me.id+'-loadingbox',
				title: data.title,
				width:300,
				height:100,
				iconCls: 'icon-grid',
				animCollapse:false,
				constrainHeader:true,
				resizable: false,
				closable: false,
				maximizable: false,
				minimizable: true,
				modal: data.modal,
				layout: {
					type: 'fit'
				},
				items: [
					{
						xtype: 'panel',
						height:60,
						layout: {
							type: 'auto'
						},
						border: 0,			                    
						bodyPadding: 10,
						items: [
							{
								xtype: 'label',
								id: 'core-progressbar-text-'+me.id, 
								text: data.msg,
								height:30,
								anchor: '100%'
							},
							{
								xtype: 'progressbar',
								id: 'core-progressbar-progress-'+me.id, 
								text:'0%',
								margin: '5 0 0 0',
								border: 1,
								listeners: {
									afterrender: function(){
										
										Ext.getCmp('core-progressbar-progress-'+me.id).wait({
											interval: 1000, //bar will move fast!
											duration: 50000,
											increment: 50,
											text: 'Progress...'
										});
									}
								}
								
							}
						]
					}
					
				]
			});
		}				
		//win.show();	
		
    },
	SuspendOff: function(me){
		Ext.Array.remove(me.app.LoadingBox.inSuspend, me.id);
		var newDt = new Array();
		for(x in this.dtMaxSuspend){
			if(x != me.id){
				newDt[x] = this.dtMaxSuspend[x];
			}
		}
		this.dtMaxSuspend = newDt;
		
		var newDt = new Array();
		for(x in this.checkSuspendTime){
			if(x != me.id){
				newDt[x] = this.checkSuspendTime[x];
			}
		}
		this.checkSuspendTime = newDt;		
		
	},
	update: function(meId, text){
		Ext.getCmp('core-progressbar-text-'+meId).setText(text);
	},
	close: function(meId){
		Ext.getCmp(meId+'-loadingbox').close();
	},
	loadCounter : function(getData){
        
		var dtDefault = {
			meId: '',
			name: '',
			data: [],
			total: 1,
			tipe: 'progress',
			interval: 1000,
			duration: 50000,
			increment: 50
		}
		
		var newDt = Ext.Object.merge(dataDefault,getData);
		count = newDt.data.length;
		
		loadId = Ext.getCmp(newDt.meId+'-loadingbox');
		
		var i = newDt.total/count;
		if(tipe == 'percent'){			
			loadId.updateProgress(i, Math.round(100*i)+'% completed...');
		}else
		if(tipe == 'load_files'){		
			loadId.updateProgress(i, 'Loading '+newDt.name+'...');
		}else
		if(tipe == 'load_number'){
			loadId.updateProgress(i, 'Loading item ' + newDt.total + ' of '+count+'...');
		}else
		if(tipe == 'save_files'){		
			loadId.updateProgress(i, 'Saving '+newDt.name+'...');
		}else
		if(tipe == 'save_number'){
			loadId.updateProgress(i, 'Saving item ' + newDt.total + ' of '+count+'...');
		}else
		if(tipe == 'update_files'){		
			loadId.updateProgress(i, 'Update '+newDt.name+'...');
		}else
		if(tipe == 'update_number'){
			loadId.updateProgress(i, 'Update item ' + newDt.total + ' of '+count+'...');
		}else{
			
			loadId.wait({
				interval: newDt.interval, //bar will move fast!
				duration: newDt.duration,
				increment: newDt.increment,
				text: 'Progress...'
			});
		}
        
		//how to check loadtimes
    }
});


/* Filename: MessageBox.js */
/**
 * @class ExtApp.core.MessageBox
 * @extends Ext.window.MessageBox
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Fri Jul 29 10:15:49 CDT 2011
 *
 * Description
 * Core MessageBox Controller
 *
 **/

Ext.define("ExtApp.core.MessageBox",{
	extend 				: "Ext.window.MessageBox",
	alternateClassName	: "ExtApp.Msg",
	singleton			: true,
	
	alert	: function(message,isModal,callback,scope){
		if(!isModal){
			isModal = false;
		}
		this.show({
			title	: "Alert",
			modal	: isModal,
			icon	: Ext.Msg.WARNING,
			buttons	: Ext.Msg.OK,
			msg		: message,
			fn		: callback || Ext.emptyFn,
			scope	: scope || this
		});
	},
	
	about	: function(message, isModal,callback,scope){
		if(!isModal){
			isModal = false;
		}
	
		this.show({
			title	: "About",
			modal	: isModal,
			iconCls	: 'icon-about',
			//icon	: Ext.Msg.INFO,
			buttons	: Ext.Msg.OK,
			msg		: message,
			fn		: callback || Ext.emptyFn,
			scope	: scope || this
		});
	},
	
	info	: function(message, isModal,callback,scope){
		if(!isModal){
			isModal = false;
		}
	
		this.show({
			title	: "Information",
			modal	: isModal,
			icon	: Ext.Msg.INFO,
			buttons	: Ext.Msg.OK,
			msg		: message,
			fn		: callback || Ext.emptyFn,
			scope	: scope || this
		});
	},
	
	
	success	: function(message,isModal,callback,scope){
		if(!isModal){
			isModal = false;
		}
	
		this.show({
			title	: "Success",
			modal	: true,
			icon	: Ext.Msg.INFO,
			buttons	: Ext.Msg.OK,
			msg		: message,
			fn		: callback || Ext.emptyFn,
			scope	: scope || this
		});
	},
	
	error	: function(message, isModal,callback,scope){
		if(!isModal){
			isModal = false;
		}
		
		this.show({
			title	: "Error",
			modal	: isModal,
			icon	: Ext.Msg.ERROR,
			buttons	: Ext.Msg.OK,
			msg		: message,
			fn		: callback || Ext.emptyFn,
			scope	: scope || this
		});
	},
	
	warning	: function(message,isModal,callback,scope){
		if(!isModal){
			isModal = false;
		}
		this.show({
			title	: "Warning",
			modal	: isModal,
			icon	: Ext.Msg.WARNING,
			buttons	: Ext.Msg.OK,
			msg		: message,
			fn		: callback || Ext.emptyFn,
			scope	: scope || this
		});
	},
	
	confirm	: function(message,isModal,callback,scope){
		if(!isModal){
			isModal = false;
		}
		
		this.show({
			title	: "Confirm",
			modal	: isModal,
			icon	: Ext.Msg.QUESTION,
			buttons	: Ext.Msg.YESNO,
			msg		: message,
			fn		: callback || Ext.emptyFn,
			scope	: scope || this
		});
	}
	
});

/* Filename: Application.js */
/**
 * @class ExtApp.Application
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 * Description
 * Core Application
 *
 **/

Ext.define('ExtApp.core.Application', {
    mixins: {
        observable: 'Ext.util.Observable'
    },

    requires: [
        //'ExtApp.desktop.Desktop'
    ],

    isReady: false,
    modules: null,
    regModules: [],
    regModulesLoadControllerFile: [],
    regModulesLoadFile: [],
    regModulesStore: [],
    mainApp: null,
	mainTreeMenu: [],
	loadMenuStat: true,
    generalStore: {},
    generalData: {},
    helperData: {},
    currAutoLoadStore: [],
    currAutoLoadAfterClose: [],
    useQuickTips: true,

    constructor: function (config) {
        var me = this;

        me.mixins.observable.constructor.call(this, config);
		
		this.buildDesktop(ConfModule);
		
    },

    buildDesktop: function(data) {
        var me = this, desktopCfg;
		me.userConfig = data;
        if (me.useQuickTips) {
            Ext.QuickTips.init();
        }
		
		//Load Override
		this.LoadOverride();
		
		//LOADER-BOX
		me.LoadingBox = this.createLoader();
		me.LoadCR = this.createCR();
		
		me.generalStore = me.loadGeneralStore();
		me.generalData = me.createGeneralStore();
		me.helperData = me.loadHelper();		
				
		me.mainApp = data.applications.mainApp;
		me.mainTreeMenu = data.applications.treeMenu;
		me.regModules = [];
		me.regModulesLoadFile = [];
		CurrMe = me;
		
		me.loadMenuStat = false;
					
		desktopCfg = me.getDesktopConfig(data);
		desktopCfg.userConfig = data;
		
		me.desktop = new ExtApp.desktop.Desktop(desktopCfg);
					
		me.viewport = new Ext.container.Viewport({
			layout: 'fit',
			items: [ me.desktop ]
		});

		Ext.EventManager.on(window, 'beforeunload', me.onUnload, me);
		me.isReady = true;
		me.fireEvent('ready', me);
			
		//LOAD WIDGET HERE
		me.widgets = [];
		me.loadWidgets = data.applications.widget;
		me.widgetLoader();
					
		//LOAD BACKGROUND MODULES
		me.loadBgModules = data.applications.bgprocess;
		me.bgModuleLoader(0);
		
    },
	afterLoadMenu: function(){
		var me = this;
		if(me.loadMenuStat == false){
		
			desktopCfg = me.getDesktopConfig(data);
			desktopCfg.userConfig = data;
			
			me.desktop = new ExtApp.desktop.Desktop(desktopCfg);
						
			me.viewport = new Ext.container.Viewport({
				layout: 'fit',
				items: [ me.desktop ]
			});

			Ext.EventManager.on(window, 'beforeunload', me.onUnload, me);
			me.isReady = true;
			me.fireEvent('ready', me);
			
		}else{
			setTimeout(function(){
				me.afterLoadMenu();
			},100);
		}
	},
	createLoader:function(winID, progTxt, ProgStat){
		
		if(!winID){
			winID = 'win-loader';
		}
		if(!progTxt){
			progTxt = 'core-progressbar-text';
		}
		if(!ProgStat){
			ProgStat = 'core-progressbar-progress';
		}
	
		return Ext.create('Ext.window.Window', {
			id: winID,
			title: 'Loading...',
			width: 300,
			layout: 'fit',
			resizable: false,
			closable: false,
			maximizable: false,
			minimizable: false,
			items: [
				{
					xtype: 'panel',
					height:60,
					layout: {
						type: 'auto'
					},
					border: 0,			                    
					bodyPadding: 10,
					items: [
						{
							xtype: 'label',
							id: progTxt, 
							text: '...',
							height:30,
							anchor: '100%'
						},
						{
							xtype: 'progressbar',
							id: ProgStat, 
							text:'Progress...',
							margin: '5 0 0 0',
							border: 1,
							listeners: {
								afterrender: function(){									
									Ext.getCmp(ProgStat).wait({
										interval: 500, //bar will move fast!
										duration: 10000,
										increment: 20,
										text: 'Progress...'
									});
								}
							}
							
						}
					]
				}
			]
		});
	},
	updateLoadingBox: function(winTitle, progTxt, ProgStat, isReset){
		if(winTitle){
			Ext.getCmp('win-loader').setTitle(winTitle);
		}
		
		if(progTxt){
			if(progTxt.length > 40){
				progTxt = progTxt.slice(0, 40)+'...';
			}
			Ext.getCmp('core-progressbar-text').setText(progTxt);
		}
		
		if(isReset){
			Ext.getCmp('core-progressbar-progress').updateProgress(20,ProgStat,true);
			Ext.getCmp('core-progressbar-progress').reset();
		}
		
		if(ProgStat){
			this.updateProgress(500, 10000, 20, ProgStat);			
		}		
		
	},
	updateProgress: function(interval, duration, increment, text){
		Ext.getCmp('core-progressbar-progress').wait({
			interval: interval, //bar will move fast!
			duration: duration,
			increment: increment,
			text: text
		});
	},
	startProgress: function(progBar,ProgStat,isAnimate){
		if(!progBar){
			progBar = 0;
		}
		if(!ProgStat){
			ProgStat = 'Progress';
		}
		if(!isAnimate){
			isAnimate = false;
		}
		Ext.getCmp('core-progressbar-progress').updateProgress(barStat,ProgStat,isAnimate);
		if(progBar == 0){
			Ext.getCmp('core-progressbar-progress').reset();
		}
		
	},
	completeProgress: function(text){
		if(!text){
			text = 'Done';
		}
		
		Ext.getCmp('core-progressbar-progress').updateProgress(20,text,true);
		//Ext.getCmp('core-progressbar-progress').stopAnimation();
		Ext.getCmp('core-progressbar-progress').reset();
		
		
		//Ext.getCmp('core-progressbar-progress').updateProgress(1,text,true);
		this.LoadingBox.hide();
		Ext.getCmp('core-progressbar-progress').updateProgress(0,'Progress',true);
	},
	/**
	 * This function allow you to display notifications in the desktop
	 * @param {Object} config The message to show
	 */
	showNotification: function(data){
		return Ext.create("ExtApp.core.Notification",{
			config		: {
				message	: "Loading..",
				time	: data.timer,
				autoClose	: data.autoClose
			},
			data	: {message: data.message}
		});
	},
	
	
    /**
     * This method returns the configuration object for the Desktop object. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getDesktopConfig: function () {
		
        var me = this;
		//alert('x => '+me.userConfig);
		var cfg = {
            app: me,
            taskbarConfig: me.getTaskbarConfig(me.userConfig)
        };
		
        Ext.apply(cfg, me.desktopConfig);
        return cfg;
    },
	setGeneralStore: function (dataStore) {
		
        var me = this;
		var dModules = me.regModulesStore;
		if(!dModules){
			dModules = me.regModules;
		}
		var newStore = me.generalStore;
		for(x in dataStore){
			//alert('dataStore: '+x);
			if(!Ext.Array.contains(dModules , x)){				
				//alert('add store: '+x);
				Ext.Array.push(me.regModulesStore, x);
				newStore[x] = dataStore[x];
			}else{
				//alert('edit store: '+x);
				var oldStore = [];
				for(y in newStore[x]){					
					Ext.Array.push(oldStore, newStore[x][y].store_name);
				}
				
				for(y in dataStore[x]){
					if(!Ext.Array.contains(oldStore , dataStore[x][y].store_name)){	
						//alert('create '+dataStore[x][y].store_name);
						newStore[x][y] = dataStore[x][y];
					}
				}
			}
		}
		
		if(dataStore){
			me.generalStore = newStore;
		}
        return newStore;
    },
	getGeneralDataList:  function(){
		//list all store: master.store_name
		var me = this;
		var generalData = me.generalData;
		var GeneralDataList = [];
		for(moduleName in generalData){
			Ext.Array.push(GeneralDataList, moduleName);
		}
		
		return GeneralDataList;
	},
	createGeneralStore: function(selStore){
		var me = this;
		var generalStore = me.generalStore;
		var generalDataList = me.getGeneralDataList();
		if(!selStore){
			var newGeneralStore = [];
		}else{
			var newGeneralStore = me.generalData;
		}				
		
		var no = 0;
		for(moduleName in generalStore){
			for(y in generalStore[moduleName]){
				//create store + model
				//alert(newGeneralStore);
				//alert(moduleName+'.'+storeName);
				var storeName = generalStore[moduleName][y].store_name;
				
				//check data been load
				if(!Ext.Array.contains(generalDataList , moduleName+'.'+storeName)){
					//alert(moduleName+'.'+storeName);	
					//me.updateLoadingBox('Load Store','Loading '+moduleName+'.'+storeName,'Progress...');
					//me.LoadingBox.show();
					
					newGeneralStore[moduleName+'.'+storeName] = new Ext.create('ExtApp.modules.'+moduleName+'.store.'+storeName,{
						id	 : 'store_'+moduleName+'.'+storeName,
						storeId	 : 'store_'+moduleName+'.'+storeName
					});
					
					//Ext.create('ExtApp.modules.'+moduleName+'.store.'+storeName,{
					//	id	 : 'store_'+moduleName+'.'+storeName
					//});
					
					//get url then set as local
					if(generalStore[moduleName][y].autoload){
						
						if(!Ext.Array.contains(me.currAutoLoadStore , moduleName)){
							Ext.Array.push(me.currAutoLoadStore, moduleName);
						}
						//newGeneralStore[moduleName+'.'+storeName].load();
					}
					
					if(generalStore[moduleName][y].loadAfterClose){
						
						if(!Ext.Array.contains(me.currAutoLoadAfterClose , moduleName)){
							Ext.Array.push(me.currAutoLoadAfterClose, moduleName);
						}
					}
					
					Ext.Array.push(generalDataList, moduleName+'.'+storeName);
				}
				//me.completeProgress();
			}
			no++;
		}
		
		if(selStore){
			me.generalData = newGeneralStore;
		}
		return newGeneralStore;
	},
	loadModuleStore: function(dataStore){
		this.setGeneralStore(dataStore);
		this.createGeneralStore(dataStore);			
		
	},
	getStore: function(storeName, show_alert){
		
		if(show_alert != false){
			show_alert = true;
		}
		
		if(this.generalData[storeName]){
			//return this.generalData[storeName];
			return Ext.data.StoreManager.lookup('store_'+storeName);
		}else{
		
			if(show_alert ==  true){
				ExtApp.Msg.warning('Store '+storeName+' not found!');
				var return_dt = {};
				return return_dt;
			}else{
				return false;
			}
		}
		
	},
	copyStore: function(moduleName, storeName, copyStoreName){
				
		if(this.generalData[moduleName+'.'+storeName]){
			
			var sourceStore = this.generalData[moduleName+'.'+storeName];
			var getModelName = sourceStore.model.getName();
			var getModelFields = sourceStore.model.getFields();
			 
			var newConfig = sourceStore.proxy.proxyConfig;
			var newParams = {};			
			for(x in newConfig.extraParams){
				newParams[x] = newConfig.extraParams[x];
			}
			newConfig.extraParams = {};
			newConfig.extraParams = newParams;
						 
			//new proxy
			//var newCopyProxy = new Ext.create ('Ext.data.proxy.Ajax', newConfig);
						
			//copy model			
			/*Ext.define('model_'+copyStoreName, {
				extend	: 'Ext.data.Model',
				alias	: 'model_'+copyStoreName,
				fields	: getModelFields,
				proxy	: newConfig
			});*/

				
			//copy store 			
			/*var targetStore = Ext.create ('Ext.data.Store', {
				model		: 'model_'+copyStoreName,
				autoLoad 	: sourceStore.autoLoad,
				remoteSort	: autoLoad.remoteSort,
				id			: 'store_'+copyStoreName,
				storeId		: 'store_'+copyStoreName
			});
			 			
			this.generalData[copyStoreName] = targetStore;*/
			
			this.generalData[copyStoreName] = new Ext.create('ExtApp.modules.'+moduleName+'.store.'+storeName,{
				id	 	: copyStoreName,
				storeId	: 'store_'+copyStoreName,
				proxy	: newConfig
			});
					
			//return this.generalData[copyStoreName];
			return Ext.data.StoreManager.lookup('store_'+copyStoreName);
		}else{
			ExtApp.Msg.warning('Store '+storeName+' not found!');
		}
		
	},
	getHelperDataList: function(){
		//list all store: master.store_name
		var me = this;
		var helperData = me.helperData;
		var helperDataList = [];
		for(helperName in helperData){
			Ext.Array.push(helperDataList, helperName);
		}
		
		return helperDataList;
	},
	createHelper: function(newHelper, module_id){
		var me = this;
		var helperDataList = me.getHelperDataList();
		
		var newHelperDataLoad = [];
			
		if(!newHelper){
			var newHelperData = [];
		}else{
			var newHelperData = me.helperData;
		}	
		
		if(newHelper){
			for(x in newHelper){
				//alert(newHelper[x]);
				if(!Ext.Array.contains(helperDataList , newHelper[x])){
					
					//me.updateLoadingBox('Load Helper','Loading '+newHelper[x],'Progress...');
					//me.LoadingBox.show();
					
					newHelperDataLoad[x] = 'ExtApp.helper.'+newHelper[x];
				}	
			}	
			
			if(!module_id){
				module_id = 'CoreApps';
			}
							
			if(newHelperDataLoad.length > 0){
				//LOAD ALL HELPER AJAX				
			
				var d = new Date();
				var curr_time = d.getTime(); 
			
				Ext.Ajax.request({
					waitMsg: 'Load Require Helper: '+module_id+'...',
					url : appUrl+'backend/ModuleLoader/loadHelper?_dc='+curr_time,												
					method: 'POST',
					params:{
						//file: 'ModuleLoader',
						//action: 'loadHelper',
						module_id: module_id,
						data_helper: Ext.JSON.encode(newHelperDataLoad)
					},
					success:function(response,options){
						var rsp = response.responseText;
						
						if(rsp == 'Load Helper Failed!'){
							ExtApp.Msg.warning('Load Helper for: '+moduleID+' Failed!');
						}else{
							eval(rsp);
							
							if(newHelper){
								for(x in newHelper){
									if(!Ext.Array.contains(helperDataList , newHelper[x])){							
										newHelperData[newHelper[x]] = new Ext.create('ExtApp.helper.'+newHelper[x]);
									}
								}
							}
							
							me.helperData = newHelperData;
						}
					}
				});
			
			}
			
			//me.completeProgress();	
		}				
		
		
		return newHelperData;
		
	},
	getHelper: function(helperName){
				
		if(this.helperData[helperName]){
			return this.helperData[helperName];
		}else{
			ExtApp.Msg.warning('Helper: '+helperName+' not found!');
		}
		
	},
    getModules: Ext.emptyFn,
	
    /**
     * This method returns the configuration object for the TaskBar. A derived class
     * can override this method, call the base version to build the config and then
     * modify the returned object before returning it.
     */
    getTaskbarConfig: function () {
		
		var me = this; 
		
		//RightStartMenu
		var ret_item = [];
		Ext.each(me.userConfig.applications.rightStartMenu, function (item) {
            ret_item.push({
                text:  item.text,
				textAlign: 'left',
				iconCls: item.iconCls,
                module: item.module,
                handler: me.onRightStartMenuClick,
                scope: me
            });
        });
		
		//defaultItem
		ret_item.push('-');
		ret_item.push({
                        text:'About',
						textAlign: 'left',
                        iconCls:'icon-about',
                        handler: me.onAbout,
						module: 'defaultAbout',
                        scope: me
                    });
		ret_item.push({
                        text:'Logout',
						textAlign: 'left',
                        iconCls:'icon-logout',
                        handler: me.onLogout,
						module: 'defaultLogout',
                        scope: me
                    });					
		
		
		var dataStart = {
			titlename: me.userConfig.user.fullname,
			items: ret_item
		};
	
        var cfg = {
            app: me,
            startConfig: me.getStartConfig(dataStart)
        };

        Ext.apply(cfg, me.taskbarConfig);
        return cfg;
    },

    onRightStartMenuClick: function (btn) {
        var me = this, module = this.getModule(btn.module), window;
		//alert(module);
        if(module.appClass) {			
			if(!Ext.Array.contains( me.regModules , module.appClass)){
				//alert('Create Module: '+module.appClass);
				Ext.getCmp(module.appClass).fireEvent('click');
			}else{
				//alert('Re-Open module: '+module.appClass);	
				Ext.getCmp(module.appClass).fireEvent('click');
			}
            //window = module.createWindow();
            //window.show();
        }
    },

    /**
     * This method returns the configuration object for the Start Button. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getStartConfig: function () {
        var me = this,
            cfg = {
                app: me,
                menu: []
            },
            launcher;

        Ext.apply(cfg, me.startConfig);
		
		cfg.menu = me.mainTreeMenu;
		
		return cfg;
    },
    createWindow: function(module) {
		
		var me = this;	
				
		if(!Ext.Array.contains( me.regModulesLoadFile , module.id)){
			//LOAD ALL HELPER, MODELS, STORE AND VIEW	
			me.updateLoadingBox('Load Module','Loading Module: '+module.launcher.text,'Progress...',true);
			me.LoadingBox.show();
			
			//check is use LoadBox, show loadBox, suspend till progress done
			if(module.useHelper){
				me.createHelper(module.useHelper, module.id);
				//me.app.LoadingBox.hide();
			}
			
			var d = new Date();
			var curr_time = d.getTime(); 			
			Ext.Ajax.request({
				waitMsg: 'Load Module: '+module.launcher.text+'...',
				url : appUrl+'backend/ModuleLoader/loadStoreModel?_dc='+curr_time,												
				method: 'POST',
				params:{
					//file: 'ModuleLoader',
					//action: 'loadStoreModel',
					module_id: Ext.JSON.encode(module.id),
					data_store: Ext.JSON.encode(module.ModuleStore),
					data_model: Ext.JSON.encode(module.ModuleModel)
				},
				success:function(response,options){
					var rsp = response.responseText;
					
					if(rsp == 'Load Module Failed!'){
						ExtApp.Msg.warning('Load Module: '+module.launcher.text+' Failed!');
					}else{
						eval(rsp);
						
						Ext.Array.push(me.regModulesLoadFile, module.id);
						
						if(module.isloadModuleStore){
							me.loadModuleStore(module.ModuleStore);
							//me.app.LoadingBox.hide();
							
							me.setAutoLoadStore(module);
						}
						
						me.completeProgress();					
						me.createWindowNow(module);
					}
				},
				failure:function(response,options){
					var rsp = Ext.decode(response.responseText);
					
					me.completeProgress();
					ExtApp.Msg.warning('Load Module: '+module.launcher.text+' Failed!');
				}
			});
		
		}else{
			me.createWindowNow(module);
		}
		
    },
	setAutoLoadStore: function(module){
				
		var currAutoLoad = [];
		var currAutoLoadParams = [];
		//var currAutoLoadAfterClose = [];
		var totAuto = 0;
		//var totAutoAfterClose = 0;
		if(module.ModuleStore){
			for(moduleName in module.ModuleStore){
				//AUTOLOAD - FIRSTLOAD
				if(Ext.Array.contains(this.currAutoLoadStore , moduleName)){
					for(y in module.ModuleStore[moduleName]){
						var storeName = module.ModuleStore[moduleName][y].store_name;
						if(module.ModuleStore[moduleName][y].autoload){
							if(!Ext.Array.contains(currAutoLoad , moduleName+'.'+storeName)){
								Ext.Array.push(currAutoLoad, moduleName+'.'+storeName);
								totAuto++;
							}
							
							//params
							if(module.ModuleStore[moduleName][y].params){
								if(Ext.Array.contains(currAutoLoad , moduleName+'.'+storeName)){
									currAutoLoadParams[moduleName+'.'+storeName] = module.ModuleStore[moduleName][y].params;									
								
								}								
							}
						}
					}
					
					Ext.Array.remove(this.currAutoLoadStore , moduleName);
				}
				
			}
		}
		
		//alert('totAuto = '+totAuto);
		//alert('totAutoAfterClose = '+totAutoAfterClose);
		
		if(totAuto > 0){
			var sendData = {
				no: 0,
				allAuto: currAutoLoad,
				allAutoParams: currAutoLoadParams,
				module: module
			};
			this.autoLoadStoreNow(sendData, this);
			
		}else{
			
			this.createWindowNow(module);
		}
		
	},
	autoLoadStoreNow: function(sendData, me){
		if(sendData){
			var generalData = me.generalData;
			var autoLoadData = sendData.allAuto;
			var autoLoadDataParams = sendData.allAutoParams;
			if(generalData[autoLoadData[sendData.no]]){
				
				//me.updateLoadingBox('Load Data','Loading Data '+autoLoadData[sendData.no],'Progress...',true);
				//me.LoadingBox.show();
				
				var theParam = {};
				//PARAMS
				if(autoLoadDataParams[autoLoadData[sendData.no]]){
					//alert(autoLoadDataParams[autoLoadData[sendData.no]]);
					theParam = autoLoadDataParams[autoLoadData[sendData.no]];
				}
				
				generalData[autoLoadData[sendData.no]].load({
					params: theParam,
					callback: function(records, operation, success){
						var nextNo = sendData.no + 1;
						if(nextNo < autoLoadData.length){
							//me.startProgress(0,'Progress...',true);
							sendData.no = nextNo; 
							me.autoLoadStoreNow(sendData, me);
						}else{
							//loader is complete
							//me.completeProgress();
							
							me.createWindowNow(sendData.module);
						}
					}
				});
				
				
			}
		}
		
	},
	setAutoLoadAfterClose: function(viewClass, module, afterFunc){
		var currAutoLoadAfterClose = [];
		var currAutoLoadAfterCloseParams = [];
		var totAutoAfterClose = 0;
		if(module.ModuleStore){
			for(moduleName in module.ModuleStore){
				//AUTOLOAD - IF WINDOW IS CLOSED
				if(Ext.Array.contains(this.currAutoLoadAfterClose , moduleName)){
					for(y in module.ModuleStore[moduleName]){
						var storeName = module.ModuleStore[moduleName][y].store_name;
						if(module.ModuleStore[moduleName][y].loadAfterClose){
							if(!Ext.Array.contains(currAutoLoadAfterClose , moduleName+'.'+storeName)){
								Ext.Array.push(currAutoLoadAfterClose, moduleName+'.'+storeName);
								totAutoAfterClose++;
							}
						}
						
						//params
						if(module.ModuleStore[moduleName][y].params){
							if(Ext.Array.contains(currAutoLoadAfterClose , moduleName+'.'+storeName)){
								currAutoLoadAfterCloseParams[moduleName+'.'+storeName] = module.ModuleStore[moduleName][y].params;
							}								
						}
					}
					
				}	
			}
		}
		
		//alert('totAutoAfterClose = '+totAutoAfterClose);
		
		if(totAutoAfterClose > 0){
			var sendData = {
				no: 0,
				allAuto: currAutoLoadAfterClose,
				allAutoParams: currAutoLoadAfterCloseParams,
				module: module,
				viewClass: viewClass,
				afterFunc: afterFunc
			};
			this.autoLoadAfterCloseNow(sendData, this);
		}else{			
			this.callUpWindow(viewClass, module, afterFunc);		
		}
	},
	autoLoadAfterCloseNow: function(sendData, me){
		if(sendData){
			var generalData = this.generalData;
			var autoLoadData = sendData.allAuto;
			var autoLoadDataParams = sendData.allAutoParams;
			if(generalData[autoLoadData[sendData.no]]){
				
				//me.updateLoadingBox('Load Data','Loading Data '+autoLoadData[sendData.no],'Progress...', true);
				//me.LoadingBox.show();
				
				var theParam = {};
				//PARAMS
				if(autoLoadDataParams[autoLoadData[sendData.no]]){
					//alert(autoLoadDataParams[autoLoadData[sendData.no]]);
					theParam = autoLoadDataParams[autoLoadData[sendData.no]];
				}				
				
				generalData[autoLoadData[sendData.no]].load({				
					params: theParam,
					callback: function(records, operation, success){	
						var nextNo = sendData.no + 1;
						if(nextNo < autoLoadData.length){
							sendData.no = nextNo; 
							me.autoLoadAfterCloseNow(sendData, me);
						}else{						
							//loader is complete
							//me.completeProgress();							
							me.callUpWindow(sendData.viewClass, sendData.module, sendData.afterFunc);	
						}
					}
				});
			}
		}
	},
    createWindowNow: function(module){
					
		var window = module.createWindow(this);		
		if(window){
			//this.desktop.restoreWindow(window);			
			if (window.isVisible() && window.minimized == true) {
				window.restore();
				window.toFront();
			} else {
				window.show();
			}
		}
	},
	createView: function(viewClass, module, afterFunc){
		if(!module.firstLoad){
			module.firstLoad = 1;
			this.callUpWindow(viewClass, module, afterFunc);
			
		}else{
			module.firstLoad++;
			this.setAutoLoadAfterClose(viewClass, module, afterFunc);
		}
		
	},
	callUpWindow: function(viewClass, module, afterFunc){
		var getView = new Ext.create(viewClass);	
		if(getView){
			var theFunc = getView[afterFunc];
			var window = theFunc.call(this, module);

			if(window){		
				if (window.isVisible() && window.minimized == true) {
					window.restore();
					window.toFront();
				} else {
					window.show();
				}
			}
		}
	},
	initModules : function(modules) {
        var me = this;
        Ext.each(modules, function (module) {
            module.app = me;
        });
    },

    getModule : function(name) {
		var ms = this.mainApp;
		
    	//var ms = this.modules;
        for (var i = 0, leni = ms.length; i < leni; i++) {
			for (var j = 0, lenj = ms[i].length; j < lenj; j++) {
				var m = ms[i][j];
				if (m.id == name || m.appClass == name || m.module == name) {				
					return m;
				}
			}
        }
		
		newModule = {
			appClass : name
		}
        return newModule;
    },

    onReady : function(fn, scope) {
        if (this.isReady) {
            fn.call(scope, this);
        } else {
            this.on({
                ready: fn,
                scope: scope,
                single: true
            });
        }
    },
	
    getGeneralData : function() {
        return this.generalData;
    },
	
    getDesktop : function() {
        return this.desktop;
    },
	
	onError	: function(data){		
		ExtApp.Msg.error("Sorry but there was an error loading the initial configuration.");
	},
	
    onUnload : function(e) {
        if (this.fireEvent('beforeunload', this) === false) {
            e.stopEvent();
        }
    },
	
	/**
	* LOAD ALL EXT OVERRIDE
	*
	**/
	LoadOverride: function(){
		
		// Add the additional 'advanced' VTypes
		Ext.apply(Ext.form.field.VTypes, {
			daterange: function(val, field) {
				var date = field.parseDate(val);

				if (!date) {
					return false;
				}
				if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
					var start = field.up('form').down('#' + field.startDateField);
					start.setMaxValue(date);
					start.validate();
					this.dateRangeMax = date;
				}
				else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
					var end = field.up('form').down('#' + field.endDateField);
					end.setMinValue(date);
					end.validate();
					this.dateRangeMin = date;
				}
				/*
				 * Always return true since we're only using this vtype to set the
				 * min/max allowed values (these are tested for after the vtype test)
				 */
				return true;
			},

			daterangeText: 'Start date must be less than end date',

			password: function(val, field) {
				if (field.initialPassField) {
					var pwd = field.up('form').down('#' + field.initialPassField);
					return (val == pwd.getValue());
				}
				return true;
			},

			passwordText: 'Passwords do not match'
		});
		
		Ext.Ajax.timeout= 60000; 
		Ext.override(Ext.form.Basic, { timeout: Ext.Ajax.timeout / 1000 });
		Ext.override(Ext.data.proxy.Server, { timeout: Ext.Ajax.timeout });
		Ext.override(Ext.data.Connection, { timeout: Ext.Ajax.timeout });
		
	},
	
	d3c0d3: function (data) {

		  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
		    ac = 0,
		    dec = '',
		    tmp_arr = [];

		  if (!data) {
		    return data;
		  }

		  data += '';

		  do { // unpack four hexets into three octets using index points in b64
		    h1 = b64.indexOf(data.charAt(i++));
		    h2 = b64.indexOf(data.charAt(i++));
		    h3 = b64.indexOf(data.charAt(i++));
		    h4 = b64.indexOf(data.charAt(i++));

		    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

		    o1 = bits >> 16 & 0xff;
		    o2 = bits >> 8 & 0xff;
		    o3 = bits & 0xff;

		    if (h3 == 64) {
		      tmp_arr[ac++] = String.fromCharCode(o1);
		    } else if (h4 == 64) {
		      tmp_arr[ac++] = String.fromCharCode(o1, o2);
		    } else {
		      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
		    }
		  } while (i < data.length);

		  dec = tmp_arr.join('');

		  return dec.replace(/\0+$/, '');
	},
	
	createCR: function(){
		
		var CPTXT = this.d3c0d3('PGEgaHJlZj0iaHR0cDovL3d3dy53ZXBvcy5pZCIgdGFyZ2V0PSJfYmxhbmsiIHN0eWxlPSJjb2xvcjojRkZGRkZGO3RleHQtZGVjb3JhdGlvbjpub25lOyI+V2VQT1MgQ2FmZTxici8+RnJlZSAtIFZlciAzLjQyLjE1PC9hPg==');

		var APPSCR = new Ext.panel.Panel({
	        border: false,
	        shadow: false,
	        html: CPTXT,
	        width: 250,
	        floating: true,
	        padding:15,
	        bodyStyle: 'background:none;color:#FFFFFF;font-size:14px;text-align:center;text-shadow:2px 2px 2px #323232;',
	        style: 'box-shadow:none;',
	        renderTo: Ext.getBody()
	       
	    });
		
		APPSCR.alignTo(Ext.getBody(), "tr", [-280, 0]);
		
		
	},
	
	loadController: function(moduleID, scopeMe){
		
		//var CurrMe = scopeMe;
		
		if(!Ext.Array.contains( CurrMe.regModules , moduleID)){
			Ext.Array.push(CurrMe.regModules, moduleID);
			
			CurrMe.updateLoadingBox('Load Module','Load Controller: '+moduleID,'Progress...',true);
			CurrMe.LoadingBox.show();
			
			if(!Ext.Array.contains( CurrMe.regModulesLoadControllerFile , moduleID)){
				Ext.Array.push(CurrMe.regModulesLoadControllerFile, moduleID);
				
				var d = new Date();
				var curr_time = d.getTime(); 
				Ext.Ajax.request({
					waitMsg: 'Load Controller: '+moduleID+'...',
					url : appUrl+'backend/ModuleLoader/loadController?_dc='+curr_time,												
					method: 'POST',
					params:{
						//file: 'ModuleLoader',
						//action: 'loadController',
						module_id: Ext.JSON.encode(moduleID)
					},
					success:function(response,options){
						var rsp = response.responseText;
						
						CurrMe.completeProgress();
						
						if(rsp == 'Load Controller Failed!'){
							
							var newModule = Ext.define(moduleID, {
								mixins: {
									observable: 'Ext.util.Observable'
								},
								id: moduleID,
								constructor: function (config) {
									this.mixins.observable.constructor.call(this, config);
									this.init();
								},
								init: Ext.emptyFn
							});
							
							Ext.getCmp(moduleID).on('click', Ext.bind(CurrMe.loadModuleFailed, CurrMe, [moduleID]), CurrMe);
							CurrMe.loadModuleFailed(moduleID);
							
						}else{
						
							eval(rsp);
							var newModule = Ext.create(moduleID);
							newModule.app = CurrMe;
							
							CurrMe.completeProgress();
							if(!newModule.suspendCreateWindow){
								Ext.getCmp(moduleID).on('click', Ext.bind(CurrMe.createWindow, CurrMe, [newModule]), CurrMe);									
								CurrMe.createWindow(newModule);						
							}else{						
								if(newModule.suspendCreateWindow == true){
									Ext.getCmp(moduleID).on('click', Ext.bind(newModule.init, newModule, []), newModule);
									newModule.init();								
								}else{
									Ext.getCmp(moduleID).on('click', Ext.bind(CurrMe.createWindow, CurrMe, [newModule]), CurrMe);									
									CurrMe.createWindow(newModule);
								}
							}
						}					
						
						
					},
					failure:function(response,options){
						ExtApp.Msg.warning('Load Controller: '+moduleID+' Failed!');
						CurrMe.completeProgress();
					}
				});
				
			}else{
				
				var newModule = Ext.create(moduleID);
				newModule.app = CurrMe;
				
				CurrMe.completeProgress();
				if(!newModule.suspendCreateWindow){
					Ext.getCmp(moduleID).on('click', Ext.bind(CurrMe.createWindow, CurrMe, [newModule]), CurrMe);									
					CurrMe.createWindow(newModule);						
				}else{						
					if(newModule.suspendCreateWindow == true){
						Ext.getCmp(moduleID).on('click', Ext.bind(newModule.init, newModule, []), newModule);
						newModule.init();								
					}else{
						Ext.getCmp(moduleID).on('click', Ext.bind(CurrMe.createWindow, CurrMe, [newModule]), CurrMe);									
						CurrMe.createWindow(newModule);
					}
				}
				
			}
			
		}else{
			//alert('re-load module');
		}
		
		
	},
	
	loadModuleFailed: function(moduleID){
		ExtApp.Msg.warning('Load Controller: '+moduleID+' Failed!');
	},
	
	widgetLoader: function(){
		
		var me = this;
		
		//check loader is exists
		var all_widget_file = [];
		if(me.loadWidgets){
			for(x in me.loadWidgets){
				all_widget_file[x] = me.loadWidgets[x].widget;			
			}
		}
		
		var d = new Date();
		var curr_time = d.getTime(); 
		Ext.Ajax.request({
			waitMsg: 'Load Widget...',
			url : appUrl+'backend/ModuleLoader/loadWidget?_dc='+curr_time,												
			method: 'POST',
			params:{
				//file: 'ModuleLoader',
				//action: 'loadWidget',
				widget: Ext.JSON.encode(all_widget_file)
			},
			success:function(response,options){
				var rsp_widget = response.responseText;
				var widget_exists = false;
				
				eval(rsp_widget);
				if(widget_exists){
					for(x in widget_exists){
						me.widgets[widget_exists[x]] = new Ext.create('ExtApp.widgets.'+widget_exists[x]);	
					}
				}
				
			},
			failure:function(response,options){
				ExtApp.Msg.warning('Load Widget Failed!');
			}
		});
		
		//me.widgets[me.loadWidgets[x].widget] = new Ext.create('ExtApp.widgets.'+me.loadWidgets[x].widget);
		
	},
	
	bgModuleLoader: function(doLoadBg){
		
		var me = this;
		var totBgModules = 0;
		for(x in CurrMe.loadBgModules){
			totBgModules++;
		}
		
		if(!doLoadBg){
			var doLoadBg = 1;
		}
		
		var noMod = 0;
		for(x in CurrMe.loadBgModules){		
			noMod++;
			
			if(doLoadBg == noMod){			
				var bgModuleID = CurrMe.loadBgModules[x].module;
				if(!Ext.Array.contains( CurrMe.regModulesLoadControllerFile , bgModuleID)){
					Ext.Array.push(CurrMe.regModulesLoadControllerFile, bgModuleID);
					
					var d = new Date();
					var curr_time = d.getTime(); 
					Ext.Ajax.request({
						waitMsg: 'Load Controller: '+bgModuleID+'...',
						url : appUrl+'backend/ModuleLoader/loadController?_dc='+curr_time,												
						method: 'POST',
						params:{
							file: 'ModuleLoader',
							action: 'loadController',
							module_id: Ext.JSON.encode(bgModuleID)
						},
						success:function(response,options){
							var rsp = response.responseText;
													
							if(rsp == 'Load Controller Failed!'){
								
								
							}else{
							
								eval(rsp);
								var newModule = Ext.create(bgModuleID);								
								newModule.init();					
								
								//CREATE VIEWER AND STORE
								//check is use LoadBox, show loadBox, suspend till progress done
								if(newModule.useHelper){
									me.createHelper(newModule.useHelper, newModule.id);
									//me.app.LoadingBox.hide();
								}
								
								var d = new Date();
								var curr_time = d.getTime(); 			
								Ext.Ajax.request({
									waitMsg: 'Load Module: '+newModule.launcher.text+'...',
									url : appUrl+'backend/ModuleLoader/loadStoreModel?_dc='+curr_time,												
									method: 'POST',
									params:{
										file: 'ModuleLoader',
										action: 'loadStoreModel',
										module_id: Ext.JSON.encode(newModule.id),
										data_store: Ext.JSON.encode(newModule.ModuleStore),
										data_model: Ext.JSON.encode(newModule.ModuleModel)
									},
									success:function(response,options){
										var rsp = response.responseText;
										
										if(rsp == 'Load Module Failed!'){
											//ExtApp.Msg.warning('Load Module: '+newModule.launcher.text+' Failed!');
										}else{
											eval(rsp);
											
											Ext.Array.push(me.regModulesLoadFile, newModule.id);
											
											if(newModule.isloadModuleStore){
												me.loadModuleStore(newModule.ModuleStore);
												//me.app.LoadingBox.hide();
												
												me.setAutoLoadStore(newModule);
											}
											//me.createWindowNow(newModule);
										}
									},
									failure:function(response,options){
										var rsp = Ext.decode(response.responseText);
										//ExtApp.Msg.warning('Load Module: '+newModule.launcher.text+' Failed!');
									}
								});
																
							}	
							
							//do other load
							var otherMod = doLoadBg+1;
							if(otherMod <= totBgModules){
								CurrMe.bgModuleLoader(otherMod);
							}
							
						}
					});
					
				}	
			}
		}
		
		
		
		
	}
});


/* Filename: Desktop.js */
/**
 * @class ExtApp.desktop.Desktop
 * @extends Ext.panel.Panel
 * <p>This class manages the wallpaper, shortcuts and taskbar.</p>
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 */
 
Ext.define('ExtApp.desktop.Desktop', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.desktop',
    uses: [
        'ExtApp.desktop.TaskBar',
        'ExtApp.desktop.TrayClock',
        'ExtApp.desktop.Wallpaper'
    ],

    activeWindowCls: 'ux-desktop-active-win',
    inactiveWindowCls: 'ux-desktop-inactive-win',
    lastActiveWindow: null,

    border: false,
    html: '&#160;',
    layout: 'fit',

    xTickSize: 1,
    yTickSize: 1,

    app: null,

    /**
     * @cfg {Array|Store} shortcuts
     * The items to add to the DataView. This can be a {@link Ext.data.Store Store} or a
     * simple array. Items should minimally provide the fields in the
     * {@link ExtApp.desktop.model.ShortcutModel ShortcutModel}.
     */
    shortcuts: null,

    /**
     * @cfg {String} shortcutItemSelector
     * This property is passed to the DataView for the desktop to select shortcut items.
     * If the {@link #shortcutTpl} is modified, this will probably need to be modified as
     * well.
     */
    shortcutItemSelector: 'div.ux-desktop-shortcut',

    /**
     * @cfg {String} shortcutTpl
     * This XTemplate is used to render items in the DataView. If this is changed, the
     * {@link shortcutItemSelect} will probably also need to changed.
     */
    shortcutTpl: [
        '<tpl for=".">',			
			'<tpl if="opencol &gt;= 1">',
				'<div class="open-column-shortcut">',
			'</tpl>',
				'<div class="ux-desktop-shortcut" id="{name}-shortcut">',
					'<div class="ux-desktop-shortcut-icon {iconCls}">',
						'<img src="',Ext.BLANK_IMAGE_URL,'" title="{name}">',
					'</div>',
					'<span class="ux-desktop-shortcut-text">{name}</span>',
				'</div>',
					
			'<tpl if="closecol &gt;= 1">',
				'</div>',
			'</tpl>',
        '</tpl>',
        '<div class="x-clear"></div>'
    ],

    /**
     * @cfg {Object} taskbarConfig
     * The config object for the TaskBar.
     */
    taskbarConfig: null,

    windowMenu: null,

    initComponent: function () {
        var me = this;
		
		me.bbar = me.taskbar = new ExtApp.desktop.TaskBar(me.taskbarConfig);
			
		if(me.userConfig.config.window_mode == 'lite'){
			me.bbar.hide();
			me.taskbar.hide();
		}
		
		me.windowMenu = new Ext.menu.Menu(me.createWindowMenu());
		 
        me.windows = new Ext.util.MixedCollection();
		
		//CONTEX MENU
        me.contextMenu = new Ext.menu.Menu(me.createDesktopMenu(me.userConfig));
		
		//WALLPAPER
		var getWallpaper_default = ExtApp.Constants.WALLPAPER_DEFAULT;
		var getWallpaper = ExtApp.Constants.WALLPAPER_DEFAULT;
		var getWallpaperStretch = false;
		if(me.userConfig.config.wallpaper){
			getWallpaper = me.userConfig.config.wallpaper;
			getWallpaperStretch = me.userConfig.config.wallpaper_stretch;
		}
		
		//alert(getWallpaper+' '+getWallpaperStretch);
		
		//ExtApp.Constants.WALLPAPER_PATH
		me.curr_wallpaper = getWallpaper;
		me.curr_stretch = getWallpaperStretch;
		
		me.wallpaper = new ExtApp.desktop.Wallpaper({
			wallpaper		: getWallpaper,
			stretch			: getWallpaperStretch
			//curr_wallpaper	: getWallpaper,
			//curr_stretch	: getWallpaperStretch
		});
		
				
        me.items = [
            me.wallpaper,
			me.createDataView()
        ];

        me.callParent();
		
		//set shortcut handler here
		me.shortcutsView = me.items.getAt(1);
        me.shortcutsView.on('itemclick', me.onShortcutItemClick, me);

    },

    afterRender: function () {
        var me = this;
        me.callParent();
        me.el.on('contextmenu', me.onDesktopMenu, me);
		
		//me.wallpaper.setWallpaper(me.curr_wallpaper, me.curr_stretch);
    },

    //------------------------------------------------------
    // Overrideable configuration creation methods

    createDataView: function () {
        var me = this;
        return {
            xtype: 'dataview',
            overItemCls: 'x-view-over',
            trackOver: true,
            itemSelector: me.shortcutItemSelector,
            store: me.shortcuts,
            style: {
                position: 'absolute'
            },
            x: 0, y: 0,
			height: 500,
            tpl: new Ext.XTemplate(me.shortcutTpl)
        };
    },

    createDesktopMenu: function (data) {
        var me = this, ret = {
			items: []
            //items: me.contextMenuItems || []
        };
        
		Ext.each(data.applications.contextMenu, function (item) {
            ret.items.push({
                text:  item.text,
				textAlign: 'left',
				iconCls: item.iconCls,
                module: item.module,
                handler: me.onContextMenuClick,
                scope: me
            });
        });
		
		ret.items.push('-');
		
		ret.items.push({ 	
				text:'Refresh',
				textAlign: 'left',
				iconCls:'btn-refresh',
				handler: me.app.onRefreshApps,
				scope: me
			});
			
		ret.items.push({ 	
				text:'Change Wallpaper',
				textAlign: 'left',
				iconCls:'icon-wallpaper',
				handler: me.app.onChangeWallpaper,
				scope: me
			});
			
		ret.items.push({
				text:'About',
				textAlign: 'left',
				iconCls:'icon-about',
				handler: me.app.onAbout,
				scope: me
			});
		
        /*
        ret.items.push(
                { text: 'Tile', handler: me.tileWindows, scope: me, minWindows: 1 },
                { text: 'Cascade', handler: me.cascadeWindows, scope: me, minWindows: 1 })
        */
        
        return ret;
    },

    onContextMenuClick: function (btn) {
        var me = this, module = me.app.getModule(btn.module), window;
		//alert(module);
        if(module.appClass) {			
			if(!Ext.Array.contains( me.app.regModules , module.appClass)){
				//alert('Create Module: '+module.appClass);
				Ext.getCmp(module.appClass).fireEvent('click');
			}else{
				//alert('Re-Open module: '+module.appClass);	
				Ext.getCmp(module.appClass).fireEvent('click');
			}
            //window = module.createWindow();
            //window.show();
        }
    },

    createWindowMenu: function () {
        var me = this;
        		
		return {
            defaultAlign: 'br-tr',
            items: [
                { text: 'Restore', handler: me.onWindowMenuRestore, scope: me },
                { text: 'Minimize', handler: me.onWindowMenuMinimize, scope: me },
                { text: 'Maximize', handler: me.onWindowMenuMaximize, scope: me },
                '-',
                { text: 'Close', handler: me.onWindowMenuClose, scope: me }
            ],
            listeners: {
                beforeshow: me.onWindowMenuBeforeShow,
                hide: me.onWindowMenuHide,
                scope: me
            }
        };
    },

	
    //------------------------------------------------------
    // Event handler methods

    onDesktopMenu: function (e) {
        var me = this, menu = me.contextMenu;
        e.stopEvent();
        
		if (!menu.rendered) {
            menu.on('beforeshow', me.onDesktopMenuBeforeShow, me);
        }
        menu.showAt(e.getXY());
        menu.doConstrain();
		
    },

    onDesktopMenuBeforeShow: function (menu) {
        var me = this, count = me.windows.getCount();

        menu.items.each(function (item) {
            var min = item.minWindows || 0;
            item.setDisabled(count < min);
        });
    },

    onShortcutItemClick: function (dataView, record) {
        
		//alert('module => '+record.data.module);		
		//var me = this, module = me.app.getModule(record.data.module);
        //win = module && module.createWindow();
		
		var me = this;
		if(record.data.module){
			if(!Ext.Array.contains( me.app.regModules , record.data.module)){
				//alert('Create Module: '+record.data.module);
				Ext.getCmp(record.data.module).fireEvent('click');
			}else{
				//alert('Re-Open module: '+record.data.module);	
				Ext.getCmp(record.data.module).fireEvent('click');
			}			
			
		}else{
			alert('Module: '+record.data.module+' Not Exists!');	
		}
		
    },

    onWindowClose: function(win) {
        var me = this;
        me.windows.remove(win);
        me.taskbar.removeTaskButton(win.taskButton);
        me.updateActiveWindow();
    },

    //------------------------------------------------------
    // Window context menu handlers

    onWindowMenuBeforeShow: function (menu) {
        var items = menu.items.items, win = menu.theWin;
        items[0].setDisabled(win.maximized !== true && win.hidden !== true); // Restore
        items[1].setDisabled(win.minimized === true); // Minimize
        items[2].setDisabled(win.maximized === true || win.hidden === true); // Maximize
    },

    onWindowMenuClose: function () {
        var me = this, win = me.windowMenu.theWin;

        win.close();
    },

    onWindowMenuHide: function (menu) {
        menu.theWin = null;
    },

    onWindowMenuMaximize: function () {
        var me = this, win = me.windowMenu.theWin;

        win.maximize();
        win.toFront();
    },

    onWindowMenuMinimize: function () {
        var me = this, win = me.windowMenu.theWin;

        win.minimize();
    },

    onWindowMenuRestore: function () {
        var me = this, win = me.windowMenu.theWin;

        me.restoreWindow(win);
    },

    //------------------------------------------------------
    // Dynamic (re)configuration methods

    getWallpaper: function () {
        return this.wallpaper;
    },

    setTickSize: function(xTickSize, yTickSize) {
        var me = this,
            xt = me.xTickSize = xTickSize,
            yt = me.yTickSize = (arguments.length > 1) ? yTickSize : xt;

        me.windows.each(function(win) {
            var dd = win.dd, resizer = win.resizer;
            dd.xTickSize = xt;
            dd.yTickSize = yt;
            resizer.widthIncrement = xt;
            resizer.heightIncrement = yt;
        });
    },

    setWallpaper: function (wallpaper_img, stretch) {
		var imgWallpaper = ExtApp.Constants.WALLPAPER_ASSET_PATH+wallpaper_img;
		var v_this = this;
		var d = new Date();
		var curr_time = d.getTime(); 			
		
		v_this.app.updateLoadingBox('Set Wallpaper', 'Set Wallpaper: '+wallpaper_img, ' Saving...', true);
		v_this.app.LoadingBox.show();
		
		Ext.Ajax.request({
			waitMsg: 'Save Wallpaper: '+wallpaper_img+'...',
			url : appUrl+'backend/UserProfile/saveWallpaper?_dc='+curr_time,												
			method: 'POST',
			params:{
				wallpaper_img: wallpaper_img,
				stretch: stretch
			},
			success:function(response,options){
				var rsp = response.responseText
				v_this.wallpaper.setWallpaper(wallpaper_img, stretch);
				v_this.app.LoadingBox.hide();
				return v_this;
			},
			failure:function(response,options){
				var rsp = Ext.decode(response.responseText);
				ExtApp.Msg.warning('Save Wallpaper: '+wallpaper_img+' Failed!');
				v_this.app.LoadingBox.hide();
				return v_this;
			}
		});        
        
    },

    //------------------------------------------------------
    // Window management methods

    cascadeWindows: function() {
        var x = 0, y = 0,
            zmgr = this.getDesktopZIndexManager();

        zmgr.eachBottomUp(function(win) {
            if (win.isWindow && win.isVisible() && !win.maximized) {
                win.setPosition(x, y);
                x += 20;
                y += 20;
            }
        });
    },

    createWindow: function(config, cls) {
        var me = this, win, cfg = Ext.applyIf(config || {}, {
                stateful: false,
                isWindow: true,
                constrainHeader: true,
                minimizable: true,
                maximizable: true
            });

        cls = cls || Ext.window.Window;
        win = me.add(new cls(cfg));

        me.windows.add(win);

        win.taskButton = me.taskbar.addTaskButton(win);
        win.animateTarget = win.taskButton.el;

        win.on({
            activate: me.updateActiveWindow,
            beforeshow: me.updateActiveWindow,
            deactivate: me.updateActiveWindow,
            minimize: me.minimizeWindow,
            destroy: me.onWindowClose,
            scope: me
        });

        win.on({
            boxready: function () {
                win.dd.xTickSize = me.xTickSize;
                win.dd.yTickSize = me.yTickSize;

                if (win.resizer) {
                    win.resizer.widthIncrement = me.xTickSize;
                    win.resizer.heightIncrement = me.yTickSize;
                }
            },
            single: true
        });

        // replace normal window close w/fadeOut animation:
        win.doClose = function ()  {
            win.doClose = Ext.emptyFn; // dblclick can call again...
            win.el.disableShadow();
            win.el.fadeOut({
                listeners: {
                    afteranimate: function () {
                        win.destroy();
                    }
                }
            });
        };

        return win;
    },

    getActiveWindow: function () {
        var win = null,
            zmgr = this.getDesktopZIndexManager();

        if (zmgr) {
            // We cannot rely on activate/deactive because that fires against non-Window
            // components in the stack.

            zmgr.eachTopDown(function (comp) {
                if (comp.isWindow && !comp.hidden) {
                    win = comp;
                    return false;
                }
                return true;
            });
        }

        return win;
    },

    getDesktopZIndexManager: function () {
        var windows = this.windows;
        // TODO - there has to be a better way to get this...
        return (windows.getCount() && windows.getAt(0).zIndexManager) || null;
    },

    getWindow: function(id) {
        return this.windows.get(id);
    },

    minimizeWindow: function(win) {
        win.minimized = true;
        win.hide();
    },

    restoreWindow: function (win) {
		//alert(win.minimized);
        if (win.isVisible() && win.minimized == true) {
            win.restore();
            win.toFront();
        } else {
            win.show();
        }
        //return win;
    },

    tileWindows: function() {
        var me = this, availWidth = me.body.getWidth(true);
        var x = me.xTickSize, y = me.yTickSize, nextY = y;

        me.windows.each(function(win) {
            if (win.isVisible() && !win.maximized) {
                var w = win.el.getWidth();

                // Wrap to next row if we are not at the line start and this Window will
                // go off the end
                if (x > me.xTickSize && x + w > availWidth) {
                    x = me.xTickSize;
                    y = nextY;
                }

                win.setPosition(x, y);
                x += w + me.xTickSize;
                nextY = Math.max(nextY, y + win.el.getHeight() + me.yTickSize);
            }
        });
    },

    updateActiveWindow: function () {
        var me = this, activeWindow = me.getActiveWindow(), last = me.lastActiveWindow;
        if (activeWindow === last) {
            return;
        }

        if (last) {
            if (last.el.dom) {
                last.addCls(me.inactiveWindowCls);
                last.removeCls(me.activeWindowCls);
            }
            last.active = false;
        }

        me.lastActiveWindow = activeWindow;

        if (activeWindow) {
            activeWindow.addCls(me.activeWindowCls);
            activeWindow.removeCls(me.inactiveWindowCls);
            activeWindow.minimized = false;
            activeWindow.active = true;
        }

        me.taskbar.setActiveButton(activeWindow && activeWindow.taskButton);
    }
});


/* Filename: TaskBar.js */
/**
 * @class ExtApp.desktop.TaskBar
 * @extends Ext.toolbar.Toolbar
 * <p>This class manages the TaskBar.</p>
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 */

Ext.define('ExtApp.desktop.TaskBar', {
    extend: 'Ext.toolbar.Toolbar', // TODO - make this a basic hbox panel...

    requires: [
    ],

    alias: 'widget.taskbar',

    cls: 'ux-taskbar',

    /**
     * @cfg {String} startBtnText
     * The text for the Start Button.
     */
    startBtnText: 'Start',

    initComponent: function () {
        var me = this;

		me.startMenu = new ExtApp.desktop.StartMenu(me.startConfig);
		
        me.quickStart = new Ext.toolbar.Toolbar(me.getQuickStart());

        me.windowBar = new Ext.toolbar.Toolbar(me.getWindowBarConfig());
		me.windowBar.height = 32;
		me.windowBar.bodyPadding = 32;

        me.tray = new Ext.toolbar.Toolbar(me.getTrayConfig());
		me.appname = ExtApp.Constants.APP_NAME;
		me.appversion = new Ext.toolbar.Toolbar({
            width: 55,
            items: { xtype: 'label', flex: 1 , text: ExtApp.Constants.APP_VERSION}
        });
		me.height = 36;
		me.bodyPadding = 0;
		me.defaults = {
			height: 32
		};
        me.items = [
            {
                xtype: 'button',
                cls: 'ux-start-button',
                iconCls: 'ux-start-button-icon',
                //glyph: 0xf17a,
                menu: me.startMenu,
                menuAlign: 'bl-tl',
                text: 'Start Menu',
                //text: me.appname
            },
			'-',
            me.quickStart,
            {
                xtype: 'splitter', 
				//html: '&#160;',
                //height: 14, 
				width: 2, // TODO - there should be a CSS way here
                cls: 'x-toolbar-separator x-toolbar-separator-horizontal'
            },
            //'-',
            me.windowBar,
			'-',
            me.tray,
			me.appversion
        ];

        me.callParent();
    },

    afterLayout: function () {
        var me = this;
        me.callParent();
        me.windowBar.el.on('contextmenu', me.onButtonContextMenu, me);
    },

    /**
     * This method returns the configuration object for the Quick Start toolbar. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getQuickStart: function () {
        
		var me = this, ret = {
            minWidth: 20,
            width: 100,
            items: [],
            enableOverflow: true,
			id: 'QuickStartToolbar'
        };

        Ext.each(this.quickStart, function (item) {
            ret.items.push({
                tooltip: { text: item.name, align: 'bl-tl' },
                //tooltip: item.name,
                overflowText: item.name,
                iconCls: item.iconCls,
                module: item.module,
                handler: me.onQuickStartClick,
                scope: me
            });
        });
		
        return ret;
    },

    /**
     * This method returns the configuration object for the Tray toolbar. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getTrayConfig: function () {
        var ret = {
            width: 65,
            items: this.trayItems
        };
        delete this.trayItems;
        return ret;
    },

    getWindowBarConfig: function () {
        return {
            flex: 1,
            cls: 'ux-desktop-windowbar',
            //items: [ '&#160;' ],
            layout: { overflowHandler: 'Scroller' }
        };
    },

    getWindowBtnFromEl: function (el) {
        var c = this.windowBar.getChildByElement(el);
        return c || null;
    },

    onQuickStartClick: function (btn) {
        var me = this, module = this.app.getModule(btn.module), window;
		//alert(module);
        if(module.appClass) {			
			if(!Ext.Array.contains( me.app.regModules , module.appClass)){
				//alert('Create Module: '+module.appClass);
				Ext.getCmp(module.appClass).fireEvent('click');
			}else{
				//alert('Re-Open module: '+module.appClass);	
				Ext.getCmp(module.appClass).fireEvent('click');
			}
            //window = module.createWindow();
            //window.show();
        }
    },
    
    onButtonContextMenu: function (e) {
        var me = this, t = e.getTarget(), btn = me.getWindowBtnFromEl(t);
        if (btn) {
            e.stopEvent();
            me.windowMenu.theWin = btn.win;
            me.windowMenu.showBy(t);
        }
    },

    onWindowBtnClick: function (btn) {
        var win = btn.win;

        if (win.minimized || win.hidden) {
            win.show();
        } else if (win.active) {
            win.minimize();
        } else {
            win.toFront();
        }
    },

    addTaskButton: function(win) {
        var config = {
            iconCls: win.iconCls,
            enableToggle: true,
            toggleGroup: 'all',
            width: 100,
			height: 30,
            margins: '0 2 0 3',
            text: Ext.util.Format.ellipsis(win.title, 20),
            listeners: {
                click: this.onWindowBtnClick,
                scope: this
            },
            win: win
        };

        var cmp = this.windowBar.add(config);
        cmp.toggle(true);
        return cmp;
    },

    removeTaskButton: function (btn) {
        var found, me = this;
        me.windowBar.items.each(function (item) {
            if (item === btn) {
                found = item;
            }
            return !found;
        });
        if (found) {
            me.windowBar.remove(found);
        }
        return found;
    },

    setActiveButton: function(btn) {
        if (btn) {
            btn.toggle(true);
        } else {
            this.windowBar.items.each(function (item) {
                if (item.isButton) {
                    item.toggle(false);
                }
            });
        }
    }
});


/* Filename: TrayClock.js */
/**
 * @class ExtApp.desktop.TrayClock
 * @extends Ext.toolbar.TextItem
 * This class displays a clock on the toolbar.
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 */
 
Ext.define('ExtApp.desktop.TrayClock', {
    extend: 'Ext.toolbar.TextItem',

    alias: 'widget.trayclock',

    cls: 'ux-desktop-trayclock',

    html: '&#160;',

    timeFormat: 'g:i A',

    tpl: '{time}',

    initComponent: function () {
        var me = this;

        me.callParent();

        if (typeof(me.tpl) == 'string') {
            me.tpl = new Ext.XTemplate(me.tpl);
        }
    },

    afterRender: function () {
        var me = this;
        Ext.Function.defer(me.updateTime, 100, me);
        me.callParent();
    },

    onDestroy: function () {
        var me = this;

        if (me.timer) {
            window.clearTimeout(me.timer);
            me.timer = null;
        }

        me.callParent();
    },

    updateTime: function () {
        var me = this, time = Ext.Date.format(new Date(), me.timeFormat),
            text = me.tpl.apply({ time: time });
        if (me.lastText != text) {
            me.setText(text);
            me.lastText = text;
        }
        me.timer = Ext.Function.defer(me.updateTime, 10000, me);
    }
});


/* Filename: Wallpaper.js */
/**
 * @class ExtApp.desktop.Wallpaper
 * @extends Ext.Component
 * <p>This component renders an image that stretches to fill the component.</p>
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 */
 
Ext.define('ExtApp.desktop.Wallpaper', {
    extend: 'Ext.Component',

    alias: 'widget.wallpaper',

    cls: 'ux-wallpaper',
    html: '<img src="'+Ext.BLANK_IMAGE_URL+'">',

    stretch: false,
    wallpaper: null,
    stateful  : true,
    stateId  : 'desk-wallpaper',

    afterRender: function () {
        var me = this;
        me.callParent();
		
		if(me.curr_wallpaper != '' || me.curr_stretch != ''){
			//alert('init curr '+me.curr_wallpaper+' '+ me.curr_stretch);
			//me.setWallpaper(me.curr_wallpaper, me.curr_stretch);
		}else{
			//alert('init def '+me.wallpaper+' '+ me.stretch);
			//me.setWallpaper(me.wallpaper, me.stretch);
		}
		
		me.setWallpaper(me.wallpaper, me.stretch);
		
    },

    applyState: function () {
        var me = this, old = me.wallpaper;
        me.callParent(arguments);
        if (old != me.wallpaper) {
            me.setWallpaper(me.wallpaper, me.stretch);
        }
    },

    getState: function () {
        return this.wallpaper && { wallpaper: this.wallpaper };
    },

    setWallpaper: function (wallpaper, stretch) {
        var me = this, imgEl, bkgnd;
		
		me.stretch = stretch;
        me.wallpaper = wallpaper;
		
		wallpaper = ExtApp.Constants.WALLPAPER_ASSET_PATH+wallpaper;
		//alert(wallpaper+' '+stretch);
		
        if (me.rendered) {
            imgEl = me.el.dom.firstChild;

            if (!wallpaper || wallpaper == Ext.BLANK_IMAGE_URL) {
                Ext.fly(imgEl).hide();
            } else 
			if (me.stretch == true) {
                imgEl.src = wallpaper;

                me.el.removeCls('ux-wallpaper-tiled');
                Ext.fly(imgEl).setStyle({
                    width: '100%',
                    height: '100%'
                }).show();
            } else {
                Ext.fly(imgEl).hide();

                bkgnd = 'url('+wallpaper+')';
                me.el.addCls('ux-wallpaper-tiled');
            }

            me.el.setStyle({
                backgroundImage: bkgnd || ''
            });
            if(me.stateful) {
                me.saveState();
            }
        }
        return me;
    }
});


/* Filename: WallpaperModal.js */
/**
 * @class ExtApp.desktop.WallpaperModal
 * @extends Ext.window.Window
 * <p>This widget used for change desktop background, with stretch option.</p>
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 */

Ext.define('ExtApp.desktop.WallpaperModal', {
    extend: 'Ext.window.Window',

    //uses: [
    //    'ExtApp.desktop.Wallpaper',
    //    'ExtApp.desktop.model.WallpaperModel'
    //],

    layout: 'anchor',
    title: 'Change Wallpaper',
    //modal: true,
    width: 640,
    height: 330,
    border: false,
    iconCls:'icon-wallpaper',
    //glyph: 0xf009,
	animCollapse:false,
	constrainHeader:true,
	resizable:false,
	maximized: false,

    initComponent: function () {
        var me = this;
		
		var getCurrWallpaper = me.mainApp.getWallpaper();
        getWallpaper = getCurrWallpaper.wallpaper;
		getWallpaperStretch = getCurrWallpaper.stretch;
		
		me.wallpaper = getWallpaper;
		me.stretch = getWallpaperStretch;
		
        var getWallpaper_default = ExtApp.Constants.WALLPAPER_DEFAULT;
		me.preview = Ext.create('widget.wallpaper', {
			wallpaper		: getWallpaper,
			stretch			: true
		});		
		//me.preview.setWallpaper(me.wallpaper, true);
        me.tree = me.createTree();
		
		me.closeAction = 'hide';
        me.buttons = [
            { text: 'Apply', handler: me.onApply, scope: me },
            { text: 'OK', handler: me.onOK, scope: me },
            { text: 'Cancel', handler: me.close, scope: me }
        ];

        me.items = [
            {
                anchor: '0 -30',
                border: false,
                layout: 'border',
                items: [
                    me.tree,
                    {
                        xtype: 'panel',
                        title: 'Preview',
                        region: 'center',
                        layout: 'fit',
						flex: 1,
                        items: [ me.preview ]
                    }
                ]
            },
            {
                xtype: 'checkbox',
                boxLabel: 'Stretch to fit',
				id: 'set_stretch_wallpaper',
				inputValue: true,
                checked: false,
                listeners: {
                    change: function (comp) {
                        me.stretch = comp.checked;						
						//alert(comp.checked);
						me.preview.setWallpaper(me.wallpaper, true);
                    },
					boxready: function(){
						this.setValue(me.stretch);
						//alert(me.stretch);
					}
                }
            }
        ];

        me.callParent();
		
        
    },

    createTree : function() {
        var me = this;

        function child (img) {
            return { img: img, text: me.getTextOfWallpaper(img), iconCls: '', leaf: true };
        }
		
		//STATIC WALLPAPER
        var tree = new Ext.tree.Panel({
            title: 'Desktop Background',
            rootVisible: false,
            lines: false,
            autoScroll: true,
            //width: 150,
            region: 'west',
            split: true,
            //minWidth: 100,
			flex: 1,
            listeners: {
                afterrender: { fn: this.setInitialSelection, delay: 100 },
                select: this.onSelect,
                scope: this
            },
            store: new Ext.data.TreeStore({
                model: 'ExtApp.desktop.model.WallpaperModel',
                root: {
                    text:'Wallpaper',
                    expanded: true,
                    children:[
                        child('default.jpg'),
                        child('wall1.jpg'),
                        child('wall2.jpg'),
                        child('wall3.jpg'),
                        child('wall4.jpg')
                    ]
                }
            })
        });

        return tree;
    },

    getTextOfWallpaper: function (path) {
        var text = path, slash = path.lastIndexOf('/');
        if (slash >= 0) {
            text = text.substring(slash+1);
        }
        var dot = text.lastIndexOf('.');
        text = Ext.String.capitalize(text.substring(0, dot));
        text = text.replace(/[-]/g, ' ');
        return text;
    },

    onApply: function () {
        var me = this;
        if (me.wallpaper) {
            me.mainApp.setWallpaper(me.wallpaper, me.stretch);
        }
    },

    onOK: function () {
        var me = this;
        if (me.wallpaper) {
            me.mainApp.setWallpaper(me.wallpaper, me.stretch);
        }
        me.hide();
    },

    onSelect: function (tree, record) {
        var me = this;		
				
        if (record.data.img) {
			//alert(record.data.img);
			me.wallpaper = record.data.img;
            //me.selected = 'assets/desktop/wallpapers/' + record.data.img;
        } else {
			me.wallpaper = ExtApp.Constants.WALLPAPER_DEFAULT;
            //me.selected = ExtApp.Constants.WALLPAPER_ASSET_PATH+ExtApp.Constants.WALLPAPER_DEFAULT;
        }
		
        me.preview.setWallpaper(me.wallpaper, true);
    },

    setInitialSelection: function () {
		var me = this;	
		var s = me.mainApp.getWallpaper();
        if (s.wallpaper) {
            var path = 'assets/Wallpaper/' + this.getTextOfWallpaper(s.wallpaper);
			this.tree.selectPath(path, 'text');
        }
    }
});


/* Filename: StartMenu.js */
/**
 * @class ExtApp.desktop.StartMenu
 * @extends Ext.panel.Panel
 * <p>This class manages the startmenu.</p>
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 */

Ext.define('ExtApp.desktop.StartMenu', {
    extend: 'Ext.panel.Panel',

    requires: [
        //'Ext.menu.Menu'		
    ],

    ariaRole: 'menu',

    cls: 'x-menu ux-start-menu',

    defaultAlign: 'bl-tl',

    iconCls: 'user',

    floating: true,

    shadow: true,

    // We have to hardcode a width because the internal Menu cannot drive our width.
    // This is combined with changing the align property of the menu's layout from the
    // typical 'stretchmax' to 'stretch' which allows the the items to fill the menu
    // area.
    width: 350,
	//height	: 300,
	
    initComponent: function() {
        var me = this, menu = me.menu;
		
		//me.title = me.user.name+' '+me.user.lastname;
		//var menu = me.setHandler(me.applications);
		
        me.menu = new Ext.menu.Menu({
            cls: 'ux-start-menu-body',
            border: false,
            floating: false,
            ignoreParentClicks: true,
            items: menu
        });
        me.menu.layout.align = 'stretch';

        me.items = [me.menu];
        me.layout = 'fit';

        Ext.menu.Manager.register(me);
        me.callParent();
        // TODO - relay menu events

        me.toolbar = new Ext.toolbar.Toolbar(Ext.apply({
            dock: 'right',
            cls: 'ux-start-menu-toolbar',
            vertical: true,
            width: 100,
			//height: 300,
            listeners: {
                add: function(tb, c) {
                    c.on({
                        click: function() { 
                            me.hide();
                        }
                    });
                }
            }
        }, me.toolConfig));
		
        me.toolbar.layout.align = 'stretch';
        me.addDocked(me.toolbar);

        delete me.toolItems;
    },

    addMenuItem: function() {
        var cmp = this.menu;
        cmp.add.apply(cmp, arguments);
    },

    addToolItem: function() {
        var cmp = this.toolbar;
        cmp.add.apply(cmp, arguments);
    }
}); // StartMenu


/* Filename: AboutModal.js */
/**
 * @class ExtApp.desktop.AboutModal
 * @extends ExtApp.Msg.about
 * <p>This widget used for change desktop background, with stretch option.</p>
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 */

Ext.define('ExtApp.desktop.AboutModal', {
    extend: 'Ext.window.MessageBox',
	id:'ExtApp.desktop.AboutModal',	
	show: function(){
		var me = this;  
		ExtApp.Msg.about(ExtApp.Constants.APP_NAME+' '+ExtApp.Constants.APP_VERSION+' '+ExtApp.Constants.APP_RELEASE+'<br/>Using <a href="http://www.aplikasi-pos.com">WePOS-Framework</a>');
	}

});


/* Filename: ShortcutModel.js */
/**
 * @class ExtApp.desktop.model.ShortcutModel
 * @extends Ext.data.Model
 * This model defines the minimal set of fields for desktop shortcuts.
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 */
Ext.define('ExtApp.desktop.model.ShortcutModel', {
    extend: 'Ext.data.Model',
    fields: [
       { name: 'name' },
       { name: 'iconCls' },
       { name: 'module' },
       { name: 'opencol' },
       { name: 'closecol' }
    ]
});


/* Filename: WallpaperModel.js */
/**
 * @class ExtApp.desktop.model.WallpaperModel
 * @extends Ext.data.Model
 * This model defines the wallpaper data for desktop background.
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 */

Ext.define('ExtApp.desktop.model.WallpaperModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'text' },
        { name: 'img' }
    ]
});


/* Filename: Application.js */
/**
 * @class ExtApp.Application
 * @extends ExtApp.core.Application
 * requires ExtApp.desktop.model.ShortcutModel
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 * Description
 * Main Application
 *
 **/

Ext.define('ExtApp.Application', {
    extend: 'ExtApp.core.Application',

    requires: [
    ],

    init: function() {
        
		this.callParent();
		
    },
	
	loadGeneralStore: function(){
		var me = this;
		var dataStore = {
			//'folder_module': [{store_name:'store_file'}]
		};
		
		var	ret = me.setGeneralStore(dataStore);
		
		return ret;
	},
	
	loadHelper: function(){
		var me = this;
		var dataHelper = ['GUtil','Grid','phpJs']; //intialisasi awal
		
		var	ret = me.createHelper(dataHelper, 'CoreApps');
		
		return ret;
	},
	
    getDesktopConfig: function (data) {
        var me = this;
        //me.userConfig = data.user;
		var	ret = me.callParent();
		
		var getWallpaper = ExtApp.Constants.WALLPAPER_DEFAULT;
		if(data.config.wallpaper){
			getWallpaper = data.config.wallpaper;
		}
		//go to parent first - then this function		
        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',
            shortcuts: Ext.create('Ext.data.Store', {
                model: 'ExtApp.desktop.model.ShortcutModel',
				data: data.applications.shortcutApp
            }),

            wallpaper: ExtApp.Constants.WALLPAPER_PATH+getWallpaper,
            wallpaperStretch: false
        });
    },
	
    getTaskbarConfig: function (data) {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: data.applications.quickApp,
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },
	
    // config for the start menu
    getStartConfig : function(data) {
        var me = this;
		//me.userConfig = data.user;
		var ret = me.callParent();
		
        return Ext.apply(ret, {
            title: data.titlename,
            iconCls: 'user',
        	//glyph: 0xf007,
            height: 300,
            toolConfig: {
                width: 140,
                items: data.items
            }
        });
    },
	
    onLogout: function () {
        ExtApp.Msg.confirm('Are you sure you want to logout?', true,
			function(btn){
				if (btn == 'yes'){
					window.location = appUrl+'logout';
				}
			}
		);
    },

    onChangeWallpaper: function () {
			
		if(!this.WallpaperModal){
			this.WallpaperModal = new Ext.create('ExtApp.desktop.WallpaperModal',{
				mainApp: this
			});
		}
        this.WallpaperModal.show();
        this.WallpaperModal.toFront();
    },
	
    onRefreshApps: function () {
    	window.location = appUrl;    	
    },
	
    onAbout: function () {
		
		if(!this.AboutModal){
			this.AboutModal = new Ext.create('ExtApp.desktop.AboutModal',{
				mainApp: this
			});
		}
        this.AboutModal.show();
    
    }
});


/* Filename: boot.js */
/**
 * Boot Application
 * requires 
 * ExtApp.core.Ajax, ExtApp.core.Log, ExtApp.core.MessageBox, ExtApp.Application
 *
 * @author Angga Nugraha
 * @email angga.nugraha@gmail.com
 * @date Thu May 29 17:09:09 CDT 2014
 *
 * Description
 * First Boot of Apps
 *
 **/
 
if(Ext.isEmpty(ExtApp.BASE_PATH)){
	//ExtApp.log("Please set a correct value for the 'ExtApp.BASE_PATH' constant!");
	ExtApp.Msg.error("Please set a correct value for the 'ExtApp.BASE_PATH' constant!");
}

Ext.Loader.setConfig({
	enabled : true,
	paths   : {
		ExtApp 	: ExtApp.BASE_PATH+'apps',
		Ext		: ExtApp.Constants.JS_PATH+"extjs.4.2"
	} 
});

Ext.onReady(function(){
	
	//LOAD MENU
	document.getElementById('msg').innerHTML = 'Application is ready...';
	
	//load fonts
	Ext.setGlyphFontFamily("FontAwesome");
	
	//create APP
	ExtApp.App = Ext.create("ExtApp.Application",{
		name		: "ExtApp.App",
		listeners	: {
			ready	: function(){
				setTimeout(function(){
					Ext.get("loading").remove();
					Ext.get("loading-mask").fadeOut({remove:true});
				},250);
			}
		}
	});
	
});