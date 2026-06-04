<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Réservation Confirmée</title>
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
        .details-box {
            background-color: #f0fdfa;
            border-left: 4px solid #E76F51;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .details-box p {
            margin: 5px 0;
            font-size: 15px;
        }
        .details-box strong {
            color: #0A3F5C;
        }
        .btn {
            display: inline-block;
            background-color: #E76F51;
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
            <p>C'est avec grand plaisir que nous vous annonçons que votre réservation a été <strong>confirmée</strong> ! Préparez-vous à vivre une expérience inoubliable sur les vagues de Mirleft.</p>
            
            <div class="details-box">
                <p><strong>Arrivée :</strong> {{ \Carbon\Carbon::parse($reservation->check_in)->format('d M Y') }}</p>
                <p><strong>Départ :</strong> {{ \Carbon\Carbon::parse($reservation->check_out)->format('d M Y') }}</p>
                <p><strong>Voyageurs :</strong> {{ $reservation->number_of_people }}</p>
                <p><strong>Service :</strong> {{ ucfirst(str_replace('_', ' ', $reservation->service_type)) }}</p>
            </div>
            
            <p>Notre équipe a hâte de vous accueillir. Si vous avez la moindre question d'ici là, n'hésitez pas à répondre directement à cet email.</p>
            
            <div style="text-align: center;">
                <a href="{{ config('app.url') }}" class="btn">Préparez votre séjour</a>
            </div>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Azul Surf Morocco. Tous droits réservés.<br>
            Mirleft, Maroc
        </div>
    </div>
</body>
</html>
