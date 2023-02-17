drop table virtual_row;

create table virtual_row
(       
sl number  NOT NULL ENABLE ,
val number  NULL  ,
org_id number  NOT NULL ENABLE ,
branch number  NOT NULL ENABLE ,
dml_by number  NOT NULL ENABLE ,
dml_time TIMESTAMP  NOT NULL ENABLE ,
PRIMARY KEY (sl)
)       ;

insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[1001]' where sl=0;
 update virtual_row set sl = q'[1001]' where sl=1001;
 update virtual_row set val = q'[1]' where sl=1001;
 update virtual_row set org_id = q'[100]' where sl=1001;
 update virtual_row set branch = q'[100]' where sl=1001;
 update virtual_row set dml_by = q'[1000]' where sl=1001;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:11','YYYY-MM-DD HH24:MI:SS') where sl=1001;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[1002]' where sl=0;
 update virtual_row set sl = q'[1002]' where sl=1002;
 update virtual_row set val = q'[2]' where sl=1002;
 update virtual_row set org_id = q'[100]' where sl=1002;
 update virtual_row set branch = q'[100]' where sl=1002;
 update virtual_row set dml_by = q'[1000]' where sl=1002;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:12','YYYY-MM-DD HH24:MI:SS') where sl=1002;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[1003]' where sl=0;
 update virtual_row set sl = q'[1003]' where sl=1003;
 update virtual_row set val = q'[3]' where sl=1003;
 update virtual_row set org_id = q'[100]' where sl=1003;
 update virtual_row set branch = q'[100]' where sl=1003;
 update virtual_row set dml_by = q'[1000]' where sl=1003;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:13','YYYY-MM-DD HH24:MI:SS') where sl=1003;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[1004]' where sl=0;
 update virtual_row set sl = q'[1004]' where sl=1004;
 update virtual_row set val = q'[4]' where sl=1004;
 update virtual_row set org_id = q'[100]' where sl=1004;
 update virtual_row set branch = q'[100]' where sl=1004;
 update virtual_row set dml_by = q'[1000]' where sl=1004;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:13','YYYY-MM-DD HH24:MI:SS') where sl=1004;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[1005]' where sl=0;
 update virtual_row set sl = q'[1005]' where sl=1005;
 update virtual_row set val = q'[5]' where sl=1005;
 update virtual_row set org_id = q'[100]' where sl=1005;
 update virtual_row set branch = q'[100]' where sl=1005;
 update virtual_row set dml_by = q'[1000]' where sl=1005;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:14','YYYY-MM-DD HH24:MI:SS') where sl=1005;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[1006]' where sl=0;
 update virtual_row set sl = q'[1006]' where sl=1006;
 update virtual_row set val = q'[6]' where sl=1006;
 update virtual_row set org_id = q'[100]' where sl=1006;
 update virtual_row set branch = q'[100]' where sl=1006;
 update virtual_row set dml_by = q'[1000]' where sl=1006;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:15','YYYY-MM-DD HH24:MI:SS') where sl=1006;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[1007]' where sl=0;
 update virtual_row set sl = q'[1007]' where sl=1007;
 update virtual_row set val = q'[7]' where sl=1007;
 update virtual_row set org_id = q'[100]' where sl=1007;
 update virtual_row set branch = q'[100]' where sl=1007;
 update virtual_row set dml_by = q'[1000]' where sl=1007;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:15','YYYY-MM-DD HH24:MI:SS') where sl=1007;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[1008]' where sl=0;
 update virtual_row set sl = q'[1008]' where sl=1008;
 update virtual_row set val = q'[8]' where sl=1008;
 update virtual_row set org_id = q'[100]' where sl=1008;
 update virtual_row set branch = q'[100]' where sl=1008;
 update virtual_row set dml_by = q'[1000]' where sl=1008;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:16','YYYY-MM-DD HH24:MI:SS') where sl=1008;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[1009]' where sl=0;
 update virtual_row set sl = q'[1009]' where sl=1009;
 update virtual_row set val = q'[9]' where sl=1009;
 update virtual_row set org_id = q'[100]' where sl=1009;
 update virtual_row set branch = q'[100]' where sl=1009;
 update virtual_row set dml_by = q'[1000]' where sl=1009;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:17','YYYY-MM-DD HH24:MI:SS') where sl=1009;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[10010]' where sl=0;
 update virtual_row set sl = q'[10010]' where sl=10010;
 update virtual_row set val = q'[10]' where sl=10010;
 update virtual_row set org_id = q'[100]' where sl=10010;
 update virtual_row set branch = q'[100]' where sl=10010;
 update virtual_row set dml_by = q'[1000]' where sl=10010;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:21','YYYY-MM-DD HH24:MI:SS') where sl=10010;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[10011]' where sl=0;
 update virtual_row set sl = q'[10011]' where sl=10011;
 update virtual_row set val = q'[11]' where sl=10011;
 update virtual_row set org_id = q'[100]' where sl=10011;
 update virtual_row set branch = q'[100]' where sl=10011;
 update virtual_row set dml_by = q'[1000]' where sl=10011;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:23','YYYY-MM-DD HH24:MI:SS') where sl=10011;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[10012]' where sl=0;
 update virtual_row set sl = q'[10012]' where sl=10012;
 update virtual_row set val = q'[12]' where sl=10012;
 update virtual_row set org_id = q'[100]' where sl=10012;
 update virtual_row set branch = q'[100]' where sl=10012;
 update virtual_row set dml_by = q'[1000]' where sl=10012;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:23','YYYY-MM-DD HH24:MI:SS') where sl=10012;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[10013]' where sl=0;
 update virtual_row set sl = q'[10013]' where sl=10013;
 update virtual_row set val = q'[13]' where sl=10013;
 update virtual_row set org_id = q'[100]' where sl=10013;
 update virtual_row set branch = q'[100]' where sl=10013;
 update virtual_row set dml_by = q'[1000]' where sl=10013;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:24','YYYY-MM-DD HH24:MI:SS') where sl=10013;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[10014]' where sl=0;
 update virtual_row set sl = q'[10014]' where sl=10014;
 update virtual_row set val = q'[14]' where sl=10014;
 update virtual_row set org_id = q'[100]' where sl=10014;
 update virtual_row set branch = q'[100]' where sl=10014;
 update virtual_row set dml_by = q'[1000]' where sl=10014;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:25','YYYY-MM-DD HH24:MI:SS') where sl=10014;
insert into virtual_row values ('0','0','0','0','0',current_timestamp)
update virtual_row set sl = q'[10015]' where sl=0;
 update virtual_row set sl = q'[10015]' where sl=10015;
 update virtual_row set val = q'[15]' where sl=10015;
 update virtual_row set org_id = q'[100]' where sl=10015;
 update virtual_row set branch = q'[100]' where sl=10015;
 update virtual_row set dml_by = q'[1000]' where sl=10015;
 update virtual_row set dml_time =  TO_TIMESTAMP('2021-09-25 13:16:26','YYYY-MM-DD HH24:MI:SS') where sl=10015;
 commit;