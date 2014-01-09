<?php
// // get-node-files.php

// from php manual page
function formatBytes($val, $digits = 3, $mode = 'SI', $bB = 'B'){ //$mode == 'SI'|'IEC', $bB == 'b'|'B'
   $si = array('', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y');
   $iec = array('', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi');
   switch(strtoupper($mode)) {
       case 'SI' : $factor = 1000; $symbols = $si; break;
       case 'IEC' : $factor = 1024; $symbols = $iec; break;
       default : $factor = 1000; $symbols = $si; break;
   }
   switch($bB) {
       case 'b' : $val *= 8; break;
       default : $bB = 'B'; break;
   }
   for($i=0;$i<count($symbols)-1 && $val>=$factor;$i++)
       $val /= $factor;
   $p = strpos($val, '.');
   if($p !== false && $p > $digits) $val = round($val);
   elseif($p !== false) $val = round($val, $digits-$p);
   return round($val, $digits) . ' ' . $symbols[$i] . $bB;
}

// grab the custom params
// $path = isset($_REQUEST['path'])&&$_REQUEST['path'] == 'extjs' ? '../../../../../../../' : '../../../../../';
// file:///Volumes/Data/projects/startup-project/public/app/home/app/data/get-node-files.php
// $path = isset($_REQUEST['path'])&&$_REQUEST['path'] == 'extjs' ? '../../../../../' : '../../../../../';
// 'app/home/app/data/get-node-files.php'
//
// $path = '/Volumes/Data/projects/startup-project/';
$path = '/Volumes/Data/';
// $path = isset($_REQUEST['path'])&&$_REQUEST['path'] == 'public' ? '/Volumes/Data/projects/startup-project/' : '/Volumes/Data/projects/startup-project/';

$node = isset($_REQUEST['node']) ? $_REQUEST['node'] : '';
$isXml = isset($_REQUEST['isXml']);

if(strpos($node, '..') !== false){
    die('Nice try buddy.');
}

$nodes = array();
$directory = $path.$node;
if (is_dir($directory)){
    $d = dir($directory);
    while($f = $d->read()){
        if($f == '.' || $f == '..' || substr($f, 0, 1) == '.') continue;

        $filename = $directory . '/' . $f;
        date_default_timezone_set('Asia/Jakarta');
        $lastmod = date('M j, Y, g:i a', filemtime($filename));

        if(is_dir($directory.'/'.$f)){
            $qtip = 'Type: Folder<br />Last Modified: '.$lastmod;
            $nodes[] = array(
                'text' => $f,
                'id'   => $node.'/'.$f,
                'cls'  => 'folder',
                'qtip' => $qtip
            );
        };
        //  else {
        //     $size = formatBytes(filesize($filename), 2);
        //     $qtip = 'Type: JavaScript File<br />Last Modified: '.$lastmod.'<br />Size: '.$size;
        //     $nodes[] = array(
        //         'text' => $f,
        //         'id'   => $node.'/'.$f,
        //         'leaf' => true,
        //         'cls'  => 'file',
        //         'qtip' => $qtip
        //     );
        // }
    }
    $d->close();
}

if ($isXml) {
    $xmlDoc = new DOMDocument();
    $root = $xmlDoc->appendChild($xmlDoc->createElement("nodes"));
    foreach ($nodes as $node) {
        $xmlNode = $root->appendChild($xmlDoc->createElement("node"));
        $xmlNode->appendChild($xmlDoc->createElement("text", $node['text']));
        $xmlNode->appendChild($xmlDoc->createElement("id", $node['id']));
        $xmlNode->appendChild($xmlDoc->createElement("cls", $node['cls']));
        $xmlNode->appendChild($xmlDoc->createElement("leaf", isset($node['leaf'])));
    }
    header("Content-Type: text/xml");
    $xmlDoc->formatOutput = true;
    echo $xmlDoc->saveXml();
} else {
    header("Content-Type: text/json");
    echo json_encode($nodes);
}




//echo '[{"text":"AbstractComponent.js","id":"src\/AbstractComponent.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 146 KB"},{"text":"AbstractManager.js","id":"src\/AbstractManager.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 5.2 KB"},{"text":"AbstractPlugin.js","id":"src\/AbstractPlugin.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 5 KB"},{"text":"Action.js","id":"src\/Action.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 10 KB"},{"text":"Ajax.js","id":"src\/Ajax.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 3.6 KB"},{"text":"app","id":"src\/app","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"button","id":"src\/button","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"chart","id":"src\/chart","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"class","id":"src\/class","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"Component.js","id":"src\/Component.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 57 KB"},{"text":"ComponentLoader.js","id":"src\/ComponentLoader.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 7.6 KB"},{"text":"ComponentManager.js","id":"src\/ComponentManager.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 3.4 KB"},{"text":"ComponentQuery.js","id":"src\/ComponentQuery.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 37 KB"},{"text":"container","id":"src\/container","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"data","id":"src\/data","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"dd","id":"src\/dd","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"diag","id":"src\/diag","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"direct","id":"src\/direct","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"dom","id":"src\/dom","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"draw","id":"src\/draw","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"Editor.js","id":"src\/Editor.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 17 KB"},{"text":"ElementLoader.js","id":"src\/ElementLoader.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 12 KB"},{"text":"enums.js","id":"src\/enums.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 1.1 KB"},{"text":"EventManager.js","id":"src\/EventManager.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 55 KB"},{"text":"EventObject.js","id":"src\/EventObject.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 29 KB"},{"text":"Ext-more.js","id":"src\/Ext-more.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 49 KB"},{"text":"Ext.js","id":"src\/Ext.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 32 KB"},{"text":"flash","id":"src\/flash","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"FocusManager.js","id":"src\/FocusManager.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 23 KB"},{"text":"form","id":"src\/form","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"fx","id":"src\/fx","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"grid","id":"src\/grid","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"Img.js","id":"src\/Img.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 5.6 KB"},{"text":"lang","id":"src\/lang","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"layout","id":"src\/layout","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"LoadMask.js","id":"src\/LoadMask.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 13 KB"},{"text":"menu","id":"src\/menu","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"misc","id":"src\/misc","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"ModelManager.js","id":"src\/ModelManager.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 6.9 KB"},{"text":"panel","id":"src\/panel","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"perf","id":"src\/perf","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"picker","id":"src\/picker","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"PluginManager.js","id":"src\/PluginManager.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 4.4 KB"},{"text":"ProgressBar.js","id":"src\/ProgressBar.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 12 KB"},{"text":"Queryable.js","id":"src\/Queryable.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 4.3 KB"},{"text":"resizer","id":"src\/resizer","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"rtl","id":"src\/rtl","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"selection","id":"src\/selection","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"Shadow.js","id":"src\/Shadow.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 9.4 KB"},{"text":"ShadowPool.js","id":"src\/ShadowPool.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 1.7 KB"},{"text":"slider","id":"src\/slider","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"state","id":"src\/state","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"Support.js","id":"src\/Support.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 30 KB"},{"text":"tab","id":"src\/tab","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"Template.js","id":"src\/Template.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 12 KB"},{"text":"tip","id":"src\/tip","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"toolbar","id":"src\/toolbar","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"tree","id":"src\/tree","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"util","id":"src\/util","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"version","id":"src\/version","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"view","id":"src\/view","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"window","id":"src\/window","cls":"folder","qtip":"Type: Folder<br \/>Last Modified: Oct 30, 2013, 10:32 am"},{"text":"XTemplate.js","id":"src\/XTemplate.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 16 KB"},{"text":"XTemplateCompiler.js","id":"src\/XTemplateCompiler.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 19 KB"},{"text":"XTemplateParser.js","id":"src\/XTemplateParser.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 10 KB"},{"text":"ZIndexManager.js","id":"src\/ZIndexManager.js","leaf":true,"cls":"file","qtip":"Type: JavaScript File<br \/>Last Modified: Oct 30, 2013, 10:32 am<br \/>Size: 21 KB"}]';