# QlikSenseMashupTutorial

This application will gide you through the creation of a web-view showing data from Qlik Sense.
Qlik Sense Desktop is a Windows application that offers to users the possibility to create data visualizations, reports and dashboards.
Sense is able to integrate data coming from differnet origins in a very simplified way.

This tool can be downloaded from the Wlik webpage:
[http://global.qlik.com/it/explore/products/sense/desktop].
Afetr the download, the installation is pretty easy. After having it installed, it is possible to open it and to explore some example data.
In particular this application will access the Consumer Goods Sales application.

This application will create a map using the Google APIs to show the data shown in the Sales Analysis view of this sample data.

For the tutorial to work, it is necessary to open Qlik Sense Desktop on the PC.
For the pages not to show errors, it is also necessary to use Internet Explorer as a browser to navigate them.
Other browsers, in fact, will show errors and some graphical problem because they impement the Cross-origin resource sharing (CORS) mechanism that does not permit to view and integrate all Qlik component.
On Sense Server it would be possible to perform proper configurations to solve this problem, for the goal of this tutorial, that uses Qlik SenseDesktop, we will suggest using Internet Explorer (or another browser that does not do CORS check).
