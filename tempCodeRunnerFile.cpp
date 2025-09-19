#include
main()
{
int a[15];
int i,j,k,n,c=0,pos=0;
clrscr();
printf(&quot;\n Enter the number of bits&quot;);
scanf(&quot;%d&quot;,&amp;n);
printf(&quot;\n Enter the bits&quot;);
for(i=0;i&lt;n;i++)
scanf(&quot;%d&quot;,&amp;a[i]);
for(i=0;i&lt;n;i++)
{
if(a[i]==1)
{
c++;
if(c==5)
{
pos=i+1;
c=0;
for(j=n;j&gt;=pos;j--)
{
k=j+1;
a[k]=a[j];
}
a[pos]=0;
n=n+1;
}
}
else
c=0;
}
printf(&quot;\n DATA AFTER STUFFING \n&quot;);
printf(&quot; 01111110 &quot;);
for(i=0;i&lt;n;i++)
{
printf(&quot;%d&quot;,a[i]);
}
printf(&quot; 01111110 &quot;);
getch();
}