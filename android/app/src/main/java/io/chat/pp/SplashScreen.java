package io.chat.pp;

import android.content.Intent;
import android.media.Image;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class SplashScreen extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {


    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_splash_screen);
    ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
      Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
      v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
      return insets;
    });

    // animaciones
    Animation anim_foreground = AnimationUtils.loadAnimation(this, R.anim.movimiento_foreground);
    Animation anim_Logo1 = AnimationUtils.loadAnimation(this, R.anim.movimiento_logo1);
    Animation anim_Logo2 = AnimationUtils.loadAnimation(this, R.anim.movimiento_logo2);
    Animation anim_linea = AnimationUtils.loadAnimation(this, R.anim.movimiento_linea);
    Animation anim_color1 = AnimationUtils.loadAnimation(this, R.anim.movimiento_color1);
    Animation anim_color2 = AnimationUtils.loadAnimation(this, R.anim.movimiento_color2);
    Animation anim_palabras = AnimationUtils.loadAnimation(this, R.anim.movimiento_palabras);

    ImageView foreground = findViewById(R.id.Logo_Foreground);
    ImageView logo1 = findViewById(R.id.logo1);
    ImageView logo2 = findViewById(R.id.logo2);
    View linea = findViewById(R.id.diagonalLine);
    ImageView color1 = findViewById(R.id.color1);
    ImageView color2 = findViewById(R.id.color2);
    TextView nombre = findViewById(R.id.Nombre);
    TextView division = findViewById(R.id.Division);

    color1.setAnimation(anim_color1);
    color2.setAnimation(anim_color2);
    foreground.setAnimation(anim_foreground);
    logo1.setAnimation(anim_Logo1);
    logo2.setAnimation(anim_Logo2);
    linea.setAnimation(anim_linea);
    nombre.setAnimation(anim_palabras);
    division.setAnimation(anim_palabras);

    new Handler().postDelayed(new Runnable() {
      @Override
      public void run() {
        startActivity(new Intent(SplashScreen.this, MainActivity.class));
      }
    }, 4500);
  }
}
