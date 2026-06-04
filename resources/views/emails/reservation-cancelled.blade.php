<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Mise à jour de votre réservation</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f7f9fa;
            color: #1a2e34;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .header {
            background-color: #0A3F5C;
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .content {
            padding: 40px;
        }
        .content p {
            line-height: 1.6;
            margin-bottom: 20px;
            font-size: 16px;
        }
        .btn {
            display: inline-block;
            background-color: #0A3F5C;
            color: #ffffff;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 13px;
            color: #8899a6;
            background-color: #f7f9fa;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Azul Surf Morocco</h1>
        </div>
        <div class="content">
            <p>Bonjour <strong>{{ $reservation->name }}</strong>,</p>
            <p>Nous vous remercions sincèrement pour votre intérêt envers Azul Surf Morocco.</p>
            <p>Malheureusement, nous ne sommes pas en mesure de confirmer votre réservation du <strong>{{ \Carbon\Carbon::parse($reservation->check_in)->format('d M Y') }}</strong> au <strong>{{ \Carbon\Carbon::parse($reservation->check_out)->format('d M Y') }}</strong>, nos disponibilités étant épuisées pour ces dates ou le service demandé.</p>
            <p>Nous serions ravis de vous accueillir à une autre période. N'hésitez pas à consulter notre calendrier en ligne pour explorer d'autres dates qui pourraient vous convenir.</p>
            
            <div style="text-align: center;">
                <a href="{{ config('app.url') }}" class="btn">Voir les autres disponibilités</a>
            </div>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Azul Surf Morocco. Tous droits réservés.<br>
            Mirleft, Maroc
        </div>
    </div>
</body>
</html>
