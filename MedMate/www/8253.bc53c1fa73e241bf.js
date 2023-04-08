"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8253],{8253:(y,g,r)=>{r.r(g),r.d(g,{HomePageModule:()=>F});var h=r(6895),p=r(433),n=r(2078),m=r(2435),f=r(655),e=r(4650),Z=r(7556),T=r(1343),A=r(5041);function H(t,a){if(1&t&&(e.TgZ(0,"ion-card",7)(1,"ion-card-header")(2,"ion-card-title",8),e._uU(3),e.qZA()(),e.TgZ(4,"ion-card-content")(5,"h4")(6,"b"),e._uU(7,"Hora:"),e.qZA(),e._uU(8),e.qZA()()()),2&t){const o=a.$implicit;e.xp6(3),e.hij("Medicamento: ",o.medicamento,""),e.xp6(5),e.hij(" ",o.hora,"")}}function v(t,a){if(1&t&&(e.TgZ(0,"ion-item-group")(1,"ion-item-divider",4)(2,"ion-label",5)(3,"h1"),e._uU(4,"Medicamentos"),e.qZA()()(),e.YNc(5,H,9,2,"ion-card",6),e.qZA()),2&t){const o=e.oxw();e.xp6(5),e.Q6J("ngForOf",o.drugs)}}function P(t,a){if(1&t&&(e.TgZ(0,"ion-card",7)(1,"ion-card-header")(2,"ion-card-title",8),e._uU(3),e.qZA()(),e.TgZ(4,"ion-card-content")(5,"h4")(6,"b"),e._uU(7,"Doctor:"),e.qZA(),e._uU(8),e.qZA(),e.TgZ(9,"h4")(10,"b"),e._uU(11,"Fecha:"),e.qZA(),e._uU(12),e.qZA(),e.TgZ(13,"h4")(14,"b"),e._uU(15,"Hora:"),e.qZA(),e._uU(16),e.qZA()()()),2&t){const o=a.$implicit;e.xp6(3),e.hij("Especialidad: ",o.especialidad,""),e.xp6(5),e.hij(" ",o.doctor,""),e.xp6(4),e.hij(" ",o.fecha,""),e.xp6(4),e.hij(" ",o.hora,"")}}function M(t,a){if(1&t&&(e.TgZ(0,"ion-item-group")(1,"ion-item-divider",4)(2,"ion-label",5)(3,"h1"),e._uU(4,"Pr\xf3ximas citas"),e.qZA()()(),e.YNc(5,P,17,4,"ion-card",6),e.qZA()),2&t){const o=e.oxw();e.xp6(5),e.Q6J("ngForOf",o.dates)}}const d=new Date,U=d.getHours(),x=(d.getMinutes(),[{path:"",component:(()=>{class t{constructor(o,s,i,c,u){this.router=o,this.auth=s,this.store=i,this.comp=c,this.alertController=u,this.infom={medicamento:"",cdias:0,fecha:"",hora:0,userid:"",id:""},this.infoc={doctor:"",iddoctor:"",paciente:"",idpaciente:"",especialidad:"",fecha:new Date,hora:0,id:"",estado:""},this.info=null,this.drugs=[],this.dates=[]}ngOnInit(){return(0,f.mG)(this,void 0,void 0,function*(){const o=yield this.auth.getUid();o&&(this.uid=o,this.medicamentos(),this.citas(),console.log("entro1"),this.comp.menu(),this.store.getDoc("Pacientes",o).subscribe(i=>(0,f.mG)(this,void 0,void 0,function*(){if(i)return this.info=i,console.log(this.info),void(yield(yield this.alertController.create({header:"Bienvenido",message:this.info.nombre+" "+this.info.apellido,buttons:["Aceptar"]})).present())})))})}medicamentos(){this.store.consultar("Medicamentos").subscribe(s=>{s&&(this.drugs=[],s.filter(i=>i.userid==this.uid).sort((i,c)=>{const u=new Date(i.fecha+" "+i.hora+":00").getTime(),l=new Date(c.fecha+" "+c.hora+":00").getTime();return Math.abs(u-d.getTime())-Math.abs(l-d.getTime())}).slice(0,2).forEach(i=>this.drugs.push(i)),console.log(this.drugs))})}citas(){this.store.consultar("Citas").subscribe(s=>{s&&(this.dates=[],s.filter(i=>i.idpaciente==this.uid&&"Aceptada"==i.estado).filter(i=>{const c=new Date(i.fecha+" "+i.hora+":00");return c.getTime()==d.getTime()?i.hora>U:c.getTime()>d.getTime()}).sort((i,c)=>{const u=new Date(i.fecha+" "+i.hora+":00").getTime(),l=new Date(c.fecha+" "+c.hora+":00").getTime();return Math.abs(u-d.getTime())-Math.abs(l-d.getTime())}).slice(0,2).forEach(i=>this.dates.push(i)),console.log(this.dates))})}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(m.F0),e.Y36(Z.e),e.Y36(T.C),e.Y36(A.y),e.Y36(n.Br))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-home"]],decls:9,vars:2,consts:[["color","principal"],["slot","start"],[1,"ion-padding","custom-content"],[4,"ngIf"],[1,"custom-divider"],[1,"subtitle","p-3","header"],["class","custom-card",4,"ngFor","ngForOf"],[1,"custom-card"],[1,"normal"]],template:function(o,s){1&o&&(e.TgZ(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-title"),e._uU(3,"Home"),e.qZA(),e.TgZ(4,"ion-buttons",1),e._UZ(5,"ion-menu-button"),e.qZA()()(),e.TgZ(6,"ion-content",2),e.YNc(7,v,6,1,"ion-item-group",3),e.YNc(8,M,6,1,"ion-item-group",3),e.qZA()),2&o&&(e.xp6(7),e.Q6J("ngIf",s.drugs),e.xp6(1),e.Q6J("ngIf",s.dates))},dependencies:[h.sg,h.O5,n.Sm,n.PM,n.FN,n.Zi,n.Dq,n.W2,n.Gu,n.rH,n.Ub,n.Q$,n.fG,n.wd,n.sr]}),t})()}]);let b=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[m.Bz.forChild(x),m.Bz]}),t})(),F=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[h.ez,p.u5,n.Pc,b]}),t})()}}]);