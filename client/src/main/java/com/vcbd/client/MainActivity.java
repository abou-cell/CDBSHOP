package com.vcbd.client;

import android.app.Activity;
import android.graphics.Color;
import android.graphics.Insets;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsets;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
  private WebView web;

  @Override public void onCreate(Bundle b){
    super.onCreate(b);
    getWindow().setStatusBarColor(Color.parseColor("#0F4B37"));
    getWindow().setNavigationBarColor(Color.parseColor("#F6F3EE"));
    if(Build.VERSION.SDK_INT >= 26){
      getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR);
    }
    web=new WebView(this);
    web.setBackgroundColor(Color.parseColor("#F6F3EE"));
    web.setOverScrollMode(View.OVER_SCROLL_NEVER);
    web.setOnApplyWindowInsetsListener((v,insets)->{
      int top=0,bottom=0;
      if(Build.VERSION.SDK_INT >= 30){
        Insets bars=insets.getInsets(WindowInsets.Type.systemBars());
        top=bars.top; bottom=bars.bottom;
      } else {
        top=insets.getSystemWindowInsetTop();
        bottom=insets.getSystemWindowInsetBottom();
      }
      v.setPadding(0,top,0,bottom);
      return insets;
    });
    setContentView(web);
    WebSettings s=web.getSettings();
    s.setJavaScriptEnabled(true);
    s.setDomStorageEnabled(true);
    s.setAllowFileAccess(true);
    s.setAllowContentAccess(false);
    s.setDatabaseEnabled(true);
    s.setBuiltInZoomControls(false);
    s.setDisplayZoomControls(false);
    web.setWebViewClient(new WebViewClient());
    web.loadUrl("file:///android_asset/index.html");
    web.requestApplyInsets();
  }

  @Override public void onBackPressed(){if(web.canGoBack())web.goBack();else super.onBackPressed();}
}
